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
} from '@nestjs/common';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

import { query as queryHouseholds, getById, submitNomination, submitFeedback, updateHousehold, createHousehold, removeHousehold } from '../service/household.service';
import { baseUrl } from '../../lib/misc'
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';
import { Roles } from '../../../common/decorators/roles.decorator';

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
        return await getById(id);
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