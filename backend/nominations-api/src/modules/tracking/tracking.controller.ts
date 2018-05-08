import { Controller, Get, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { HouseholdService } from '../households';

@Controller('api/nominations/tracking')
@ApiUseTags('tracking')
export class TrackingController {
  constructor(private householdService: HouseholdService) {}
  //TODO: GraphQL probably better here.
  @Get('/packing-slips')
  async getAll(@Query('id') id) {
    const assistance = {
      // TODO
      phone: 'N/A',
      radio: 'N/A'
    };

    if (id) {
      const household = await this.householdService.getById(id);

      return { households: [household], assistance };
    }

    const households = await this.householdService.getAll();

    return { households, assistance };
  }
}
