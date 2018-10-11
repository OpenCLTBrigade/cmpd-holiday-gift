import { handleErrors } from 'cmpd-common-api';

import { Controller, Get, Param, Query, NotFoundException, InternalServerErrorException, Req } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AffiliationService } from './affiliation.service';
import { baseUrl } from '../lib/misc';

const errorMap = {
  default: InternalServerErrorException
};

const handleAffiliationErrors = handleErrors(errorMap);

@Controller('api/nominations/affiliations')
@ApiUseTags('affiliations')
export class AffiliationController {
  constructor(private readonly affiliationService: AffiliationService) {}
  //TODO: GraphQL probably better here.
  @Get()
  async getAll(
    @Query('search') search = '',
    @Query('page') page = 1,
    @Query('type') type = '',
    @Query('sizePerPage') sizePerPage = '',
    @Req() req
  ) {
    const results = await this.affiliationService.query({
      search,
      type,
      baseUrl: baseUrl(req),
      page
    });

    return results;
  }

  @Get('/:id')
  async getById(@Param('id') id) {
    try {
      const household = await this.affiliationService.getAffiliation(id);

      if (!household) throw new NotFoundException();

      return household;
    } catch (error) {
      handleAffiliationErrors(error);
    }
  }
}
