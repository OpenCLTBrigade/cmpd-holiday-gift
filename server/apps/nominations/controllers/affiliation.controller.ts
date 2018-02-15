import { handleErrors } from '../../../common/util/application-error';
import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AffiliationService } from '../service/affiliation.service';
import logger from '../../lib/logger';

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
  async getAll(@Query('search') search = '', @Query('page') page = '') {
    const results = await this.affiliationService.query({
      page,
      search
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
