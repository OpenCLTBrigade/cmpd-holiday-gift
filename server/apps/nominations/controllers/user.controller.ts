import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { query, getPendingUsers, getById, create, approve, decline, update } from "../service/user.service";
import { baseUrl } from '../../lib/misc'

import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateUserDto } from '../controllers/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(RolesGuard)
@Controller('api/nominations/users')
@ApiUseTags('users')
export class UserController {

    //TODO: Explore using graphql here
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

    @Put('/:id')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async update(@Req() {user: {id: userId}}, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
        return await update(updateUserDto, {id: userId});
    }

    @Put('/:id/approve')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async approve(@Param('id') id) {
        return await approve(id);
    }

    @Put('/:id/decline')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async decline(@Param('id') id) {
        return await decline(id);
    }

    @Get('/:id/status')
    @Roles('admin')
    @UseGuards(AuthGuard)
    async getNominationsStatus(@Param('id') id) {
        const { nominationLimit: limit, households } = await getById(id);
        const count = households.filter(row => !row.deleted).length;

        return { limit, count }
    }

    @Get('/me')
    @UseGuards(AuthGuard)
    async getMe(@Req() {user: {id}}) {
        return await getById(id);
    }
}