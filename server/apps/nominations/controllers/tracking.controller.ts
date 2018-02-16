import { Controller, Get, Param, Query, Req, NotFoundException } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { query } from '../service/household.service';
import { baseUrl } from '../../lib/misc';

@Controller('api/nominations/tracking')
@ApiUseTags('tracking')
export class TrackingController {
  //TODO: GraphQL probably better here.
  @Get('/packing-slips')
  async getAll(@Query('search') search, @Query('page') page, @Req() req) {
    const households = await query({
      page,
      search,
      baseUrl: baseUrl(req)
    });

    const assistance = {
      // TODO
      phone: 'N/A',
      radio: 'N/A'
    };

    return { households, assistance };
  }
}
