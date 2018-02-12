import {
    Controller,
    Get,
    Param,
    Query,
    Req,
    BadRequestException,
    InternalServerErrorException
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import logger from '../../lib/logger';
const addressTool = require('../../lib/cmpdAddress');
const geoData = require('../../data/CharlotteMecklenburg_Police_Response_Areas');

@Controller('api/nominations/cmpd')
@ApiUseTags('cmpd')
export class CmpdController {
    //TODO: GraphQL probably better here.
    @Get('/address-info')
    async getAddressInfo(@Query('long') long, @Query('lat') lat, @Req() req) {
        try {
            if (!lat || !long) {
              throw new BadRequestException('Missing information.');
            }
        
            const result = addressTool(geoData, [long, lat]);
            return { data: result };
        
          } catch (err) {
            logger.error(err, 'cmpd getAddressInfo failed');
            throw new InternalServerErrorException();
          }
    }

}