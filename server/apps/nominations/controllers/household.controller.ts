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
} from '@nestjs/common';
import * as fs from 'fs-extra';
import { createAttachment, createMainBucket, getAttachmentUrl, getAttachments } from '../../lib/attachment';

import { Request, Response } from 'express';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { query as queryHouseholds, getById, submitNomination, submitFeedback, updateHousehold, createHousehold, removeHousehold } from '../service/household.service';
import { baseUrl } from '../../lib/misc'
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import logger from '../../lib/logger';

//TODO: better place to put this???
const bucketName = process.env.S3_BUCKET_NAME || 'cfc-cmpd-explorers-qa';


@UseGuards(RolesGuard)
@Controller('api/nominations/households')
export class HouseholdController {
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
    async createAttachment(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
        const fileResults = [];
        const files = req.files; 
        const owner = `household-${id}`;
        
        if(files instanceof Array) {
            for (const file of files) {

                const { filename, path } = file;
                const fileBuffer = await fs.readFile(file.path);
                await createAttachment({ name: bucketName, filename: `${owner}/${filename}`, fileBuffer });

                logger.info('uploaded to s3', { filename });

                //TODO: Add attachment to household
                //addAttachment(id, { filename })

                await fs.remove(file.path);

                const url = await getAttachmentUrl({ name: bucketName, filename: `${owner}/${filename}` });
                fileResults.push({ url, filename });
            }
        }
        
        return fileResults;
    }

    @Post('/submit')
    @UseGuards(AuthGuard)
    async submitNomination(@Param('id') id, @Res() res) {
        await submitNomination(id);

        res.status(HttpStatus.OK).send();
    }

    @Roles('admin')
    @Post(':id/feedback')
    @UseGuards(AuthGuard)
    async submitFeedback(@Param('id') id, @Res() res) {
        await submitFeedback(id);

        res.status(HttpStatus.OK).send();
    }
}