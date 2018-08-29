import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query
  } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { handleErrors, Household } from 'cmpd-common-api';
import { ChildService } from './child.service';

const errorMap = {
  default: InternalServerErrorException
};

const hadnleChildErrors = handleErrors(errorMap);

@Controller('api/adoption/child')
@ApiUseTags('households')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @Get()
  async getAll(@Query('search') search = '', @Query('page') page = 1, @Query('type') type = '') {
    const results = await this.childService.getAll();
    return results;
  }

  @Get('/:id')
  async getById(@Param('id') id) {
    try {
      const child = await this.childService.getById(id);

      if (!child) throw new NotFoundException();

      return child;
    } catch (error) {
      hadnleChildErrors(error);
    }
  }
}
