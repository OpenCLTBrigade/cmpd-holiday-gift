import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
    UseGuards,
    ValidationPipe,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException
} from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

import { createAttachment, createMainBucket, getAttachmentUrl, getAttachments } from '../../lib/attachment';

import { Request, Response } from 'express';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { query as queryHouseholds, getById, submitNomination, submitFeedback, updateHousehold, createHousehold, removeHousehold, addAttachment } from '../service/household.service';
import { baseUrl } from '../../lib/misc'
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import logger from '../../lib/logger';
import { SubmitNominationDto } from './dto/submit-nomination.dto';

type AuthedRequest = {
    user: {id}
} & Request

//TODO: better place to put this???
const bucketName = process.env.S3_BUCKET_NAME || 'cfc-cmpd-explorers-qa';


@UseGuards(RolesGuard)
@Controller('api/nominations/households')
export class HouseholdController {

    //TODO: Explore using graphql here
    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Query('search') search, @Query('page') page, @Req() req) {
        const results = await queryHouseholds({
            page, 
            search,
            baseUrl: baseUrl(req)
          })

        return results
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getById(@Param('id') id) {
        const household = await getById(id);

        if(!household) throw new NotFoundException();

        return household;
    }

    @Post()
    @UseGuards(AuthGuard)
    async createHousehold(@Req() {user: {id}}, @Body(new ValidationPipe()) createHouseholdDto: CreateHouseholdDto) {
        return await createHousehold(createHouseholdDto, {id})
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    async updateHousehold(@Param('id') id, @Body(new ValidationPipe()) updateHouseholdDto: UpdateHouseholdDto) {
        return await updateHousehold(id, updateHouseholdDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    async removeHousehold(@Param('id') id) {
        return await removeHousehold(id);
    }

    @Put(':id/upload')
    @UseGuards(AuthGuard)
    async createAttachments(@Req() {user: {id: userId}, files}: AuthedRequest, @Res() res: Response, @Param('id') id: number) {
        const fileResults = [];
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
            if(files instanceof Array) {
                for (const file of files) {

                    const { filename, path } = file;
                    const fileBuffer = await fs.readFile(path);
                    await createAttachment({ name: bucketName, filename: `${owner}/${filename}`, fileBuffer });

                    logger.info('uploaded to s3', { filename });

                    await addAttachment({householdId: id, path: filename})

                    await fs.remove(path);

                    const url = await getAttachmentUrl({ name: bucketName, filename: `${owner}/${filename}` });
                    fileResults.push({ url, filename });
                }
            }
        
            return fileResults;
        } catch (error) {
            logger.error(error)
            throw new InternalServerErrorException();
        }
    }

    @Post('/submit')
    @UseGuards(AuthGuard)
    async submitNomination(@Param('id') id, @Res() res: Response) {
        await submitNomination(id);

        res.status(HttpStatus.OK).send();
    }

    @Roles('admin')
    @Post(':id/feedback')
    @UseGuards(AuthGuard)
    async submitFeedback(@Param('id') id, @Res() res, @Body(new ValidationPipe()) submitFeedbackDto: SubmitNominationDto) {
        await submitFeedback({id, ...submitFeedbackDto});

        res.status(HttpStatus.OK).send();
    }
}