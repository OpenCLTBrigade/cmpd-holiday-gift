import { Get, Controller, Post, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../../../common/guards/auth.guard';

import { query as queryHouseholds } from '../service/household.service';
import { baseUrl } from '../../lib/misc'

@Controller('api/nominations/households')
export class HouseholdController {
    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Query('search') search, @Query('page') page, @Req() req) {
        console.log(page);
        const results = await queryHouseholds({
            page, 
            search,
            baseUrl: baseUrl(req)
          })

        return results
    }
}