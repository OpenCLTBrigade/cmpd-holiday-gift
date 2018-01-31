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
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { query, getPendingUsers, getById, create } from "../service/user.service";
import { baseUrl } from '../../lib/misc'

import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateUserDto } from '../controllers/dto/create-user.dto';

@UseGuards(RolesGuard)
@Controller('api/nominations/users')
export class UserController {

    
    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Query('search') search, @Query('page') page, @Req() req) {
        const results = await query({
            page, 
            search,
            baseUrl: baseUrl(req)
          })

        return results
    }

    @Get('/pending')
    @UseGuards(AuthGuard)
    async getPending(@Query('search') search, @Query('page') page, @Req() req) {
        const results = await getPendingUsers({
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
    @Roles('admin')
    @UseGuards(AuthGuard)
    async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return await create(createUserDto);
    }
}