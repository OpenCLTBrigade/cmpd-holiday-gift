import { Body, Controller, Post, UseGuards, Get, ValidationPipe, Req, Res, Param, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { RolesGuard } from '../../../common/guards';
import { AccountService } from './account.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApproveUserDto } from './dto/approve-user.dto';
import { Request } from 'express';
import { rootUrl } from '../../lib/misc';
import { handleErrors } from 'cmpd-common-api';
import { Query } from '@nestjs/graphql';

const handleAuthErrors = handleErrors({});
@UseGuards(RolesGuard)
@ApiUseTags('auth')
@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AccountService) {}

  @Post('/register')
  async register(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: false }))
    registerUserDto: RegisterUserDto
  ) {
    try {
      return await this.authService.registerUser(registerUserDto, rootUrl(req));
    } catch (error) {
      handleAuthErrors(error);
    }
  }

  @Put('/approve')
  @UseGuards(AuthGuard('bearer'))
  approveUser(
    @Body(new ValidationPipe({ transform: false }))
    approveUserDto: ApproveUserDto
  ) {
    return this.authService.approveUser(approveUserDto);
  }

  @Get('/account')
  @UseGuards(AuthGuard('bearer'))
  account(@Req() request) {
    return request.user;
  }

  @Get('/verify/:phoneNumber')
  async verifyUser(@Param('phoneNumber') phoneNumber) {
    return this.authService.verifyUser(phoneNumber);
  }
}
