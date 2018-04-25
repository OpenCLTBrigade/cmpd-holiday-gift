import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { RolesGuard } from '../../common/guards/roles.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UserService } from './user.service';
import { baseUrl } from '../lib/misc';

import { Roles } from '../../common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(RolesGuard)
@Controller('api/nominations/users')
@ApiUseTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //TODO: Explore using graphql here
  @Get()
  @UseGuards(AuthGuard)
  async getAll(@Query('search') search, @Query('page') page, @Req() req) {
    const results = await this.userService.query({
      page,
      search,
      baseUrl: baseUrl(req)
    });

    return results;
  }

  @Get('/pending')
  @UseGuards(AuthGuard)
  async getPending(@Query('search') search, @Query('page') page, @Req() req) {
    const results = await this.userService.getPendingUsers({
      page,
      search,
      baseUrl: baseUrl(req)
    });

    return results;
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getById(@Param('id') id) {
    return await this.userService.getById(id);
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto
  ) {
    return await this.userService.create(createUserDto);
  }

  @Put('/:id')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async update(
    @Req() { user: { id: userId, role } },
    @Body(new ValidationPipe())
    updateUserDto: UpdateUserDto
  ) {
    return await this.userService.update(updateUserDto, { id: userId, role });
  }

  @Put('/:id/approve')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async approve(@Param('id') id) {
    return await this.userService.approve(id);
  }

  @Put('/:id/decline')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async decline(@Param('id') id) {
    return await this.userService.decline(id);
  }

  @Get('/me/status')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async getNominationsStatus(@Req() { user: { id } }) {
    const { nominationLimit: limit, households } = await this.userService.getById(id);
    const count = households.filter(row => !row.deleted).length;

    return { limit, count };
  }

  //TODO: Move into auth?
  @Get('/me/profile')
  @UseGuards(AuthGuard)
  async getMe(@Req() { user: { id } }) {
    return await this.userService.getById(id);
  }
}
