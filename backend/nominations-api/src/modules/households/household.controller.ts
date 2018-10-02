import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { handleErrors } from '../../common/util/application-error';
import { createAttachment, createMainBucket, getAttachmentUrl } from '../lib/attachment';
import logger from '../lib/logger';
import { baseUrl } from '../lib/misc';
import { ErrorCodes, HouseholdService } from './household.service';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { SubmitNominationDto } from './dto/submit-nomination.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';
import { AuthGuard } from '@nestjs/passport';

type AuthedRequest = {
  user: { id };
} & Request;

//TODO: better place to put this???
const bucketName = process.env.S3_BUCKET_NAME || 'cfc-cmpd-explorers-qa';

const errorMap = {
  [ErrorCodes.NoChildrenExists]: NotFoundException,
  default: InternalServerErrorException
};

const handleHouseholdErrors = handleErrors(errorMap);

@UseGuards(RolesGuard)
@Controller('api/nominations/households')
@ApiUseTags('nominations')
export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {}

  //TODO: Explore using graphql here
  @Get()
  @UseGuards(AuthGuard('bearer'))
  async getAll(@Query('search') search, @Query('page') page, @Req() req) {
    const results = await this.householdService.query({
      page,
      search,
      baseUrl: baseUrl(req)
    });

    return results;
  }

  @Get('/:id')
  @UseGuards(AuthGuard('bearer'))
  async getById(@Param('id') id) {
    const household = await this.householdService.getById(id);

    if (!household) throw new NotFoundException();

    return household;
  }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  async createHousehold(
    @Req() { user: { id } },
    @Body(new ValidationPipe())
    createHouseholdDto: CreateHouseholdDto
  ) {
    return await this.householdService.createHousehold(createHouseholdDto, {
      id
    });
  }

  @Put('/:id')
  @UseGuards(AuthGuard('bearer'))
  async updateHousehold(
    @Param('id') id,
    @Body(new ValidationPipe())
    updateHouseholdDto: UpdateHouseholdDto
  ) {
    return await this.householdService.updateHousehold(id, updateHouseholdDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('bearer'))
  async removeHousehold(@Param('id') id) {
    return await this.householdService.removeHousehold(id);
  }

  @Put(':id/upload')
  @UseGuards(AuthGuard('bearer'))
  async createAttachments(
    @Req() { user: { id: userId }, files }: AuthedRequest,
    @Res() res: Response,
    @Param('id') id: number
  ) {
    const fileResults = [];
    const year = new Date().getFullYear();
    const owner = `household-${id}`;
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    logger.info('uploading document for user', userId);

    try {
      await createMainBucket(bucketName);
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException();
    }

    try {
      if (files instanceof Array) {
        for (const file of files) {
          const { filename, path } = file;
          const fileBuffer = await fs.readFile(path);
          await createAttachment({
            name: bucketName,
            filename: `${year}/${owner}/${filename}`,
            fileBuffer
          });

          logger.info('uploaded to s3', { filename });

          await this.householdService.addAttachment({
            householdId: id,
            path: filename
          });

          await fs.remove(path);

          const url = await getAttachmentUrl({
            name: bucketName,
            filename: `${year}/${owner}/${filename}`
          });
          fileResults.push({ url, filename });
        }
      }

      return fileResults;
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  @Put('/:id/submit')
  @UseGuards(AuthGuard('bearer'))
  async submitNomination(@Param('id') id, @Res() res: Response) {
    try {
      await this.householdService.submitNomination(id);

      res.status(HttpStatus.OK).send();
    } catch (error) {
      handleHouseholdErrors(error);
    }
  }

  @Roles('admin')
  @Put(':id/feedback')
  @UseGuards(AuthGuard('bearer'))
  async submitFeedback(
    @Param('id') id,
    @Res() res,
    @Body(new ValidationPipe())
    submitFeedbackDto: SubmitNominationDto
  ) {
    await this.householdService.submitFeedback({ id, ...submitFeedbackDto });

    res.status(HttpStatus.OK).send();
  }
}
