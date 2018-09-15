import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { baseUrl } from '../lib/misc';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(RolesGuard)
@Controller('api/nominations/users')
@ApiUseTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //TODO: Explore using graphql here
  @Get()
  @UseGuards(AuthGuard('bearer'))
  async getAll(@Query('search') search, @Query('page') page, @Req() req) {
    const results = await this.userService.query({
      page,
      search,
      baseUrl: baseUrl(req)
    });

    return results;
  }

  @Get('/pending')
  @UseGuards(AuthGuard('bearer'))
  async getPending(@Query('search') search, @Query('page') page, @Req() req) {
    const results = await this.userService.getPendingUsers({
      page,
      search,
      baseUrl: baseUrl(req)
    });

    return results;
  }

  @Get('/:id')
  @UseGuards(AuthGuard('bearer'))
  async getById(@Param('id') id) {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('bearer'))
  async create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto
  ) {
    return await this.userService.create(createUserDto);
  }

  @Put('/:id')
  @Roles('admin')
  @UseGuards(AuthGuard('bearer'))
  async update(
    @Req() { user: { id: userId, role } },
    @Body(new ValidationPipe())
    updateUserDto: UpdateUserDto
  ) {
    return await this.userService.update(updateUserDto, { id: userId, role });
  }

  @Put('/:id/approve')
  @Roles('admin')
  @UseGuards(AuthGuard('bearer'))
  async approve(@Param('id') id) {
    return await this.userService.approve(id);
  }

  @Put('/:id/decline')
  @Roles('admin')
  @UseGuards(AuthGuard('bearer'))
  async decline(@Param('id') id) {
    return await this.userService.decline(id);
  }

  @Get('/me/status')
  @Roles('admin')
  @UseGuards(AuthGuard('bearer'))
  async getNominationsStatus(@Req() request) {
    const { nominationLimit: limit, households } = await this.userService.getById(request.user.id);
    const count = households.filter(row => !row.deleted).length;

    return { limit, count };
  }

  //TODO: Move into auth?
  @Get('/me/profile')
  @UseGuards(AuthGuard('bearer'))
  async getMe(@Req() { user: { id } }) {
    return await this.userService.getById(id);
  }
}
