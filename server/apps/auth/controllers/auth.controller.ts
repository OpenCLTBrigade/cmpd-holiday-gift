import { Request, Response } from 'express';
import {
  Get,
  Controller,
  Post,
  Req,
  Res,
  Body,
  HttpStatus,
  UseGuards,
  BadRequestException,
  ForbiddenException,
  ValidationPipe
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';


import { RegisterRequestDto, LoginRequestDto } from './dto';
import { rootUrl } from '../../lib/misc';
import auth from '../../lib/auth';
import config from '../../../config';
import { AccountService } from '../account.service';
import logger from '../../lib/logger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { ApproveUserDto } from './dto/approvie-user.dto';
import { RecoveryEmailDto } from './dto/recovery-email.dto';
import { AccessDto } from './dto/access.dto';

@UseGuards(RolesGuard)
@ApiUseTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created.'})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Validation failure.'})
  async register(
    @Req() request: Request,
    @Res() res: Response,
    @Body(new ValidationPipe()) registerDto: RegisterRequestDto
  ) {
    const result = await this.accountService.register(rootUrl(request), {
      ...registerDto
    });

    if (result) {
      res.sendStatus(HttpStatus.CREATED);
    } else {
      throw new BadRequestException();
    }
  }

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully authenticated.'})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Vailidation or authentication failure.'})
  async login(@Res() res: Response, @Body(new ValidationPipe()) loginDto: LoginRequestDto){
    const result = await this.accountService.login(loginDto);
    logger.info(result);

    if (result) {
      return res.send(result);
    } else {
      throw new BadRequestException();
    }
  }

  @UseGuards(AuthGuard)
  @Post('extend')
  @ApiResponse({ status: HttpStatus.OK, description: 'The user session has been successfully extended.'})
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Vailidation or authentication failure.'})
  async extend(@Req() req: Request, @Res() res: Response) {
    if (req['user'].id) {
      // TODO: extend existing session instead
      const result = await this.accountService.extend(req['user'].id);

      if (result) {
        return res.json(result);
      } else {
        throw new ForbiddenException();
      }
    } else {
      throw new ForbiddenException();
    }
  }

  @UseGuards(AuthGuard)
  @Post('access')
  @ApiResponse({ status: HttpStatus.OK, description: 'The user app token has been successfully created.'})
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Authentication failure.'})
  async getToken(@Req() {user}, @Res() res: Response, @Body(new ValidationPipe()) {app}: AccessDto) {
    
    if (user && auth.userCanUseApp(user, app)) {
      const {id, role, firstName, lastName} = user
      res.json({
        token: auth.makeToken(
          {
            id,
            role,
            firstName,
            lastName
          },
          config.jwtSecrets[app],
          config.appTokenLifetime
        )
      });
    } else {
      throw new ForbiddenException();
    }
  }

  @Post('confirm-email')
  @ApiResponse({ status: HttpStatus.OK, description: "The user's email has been successfully confirmed."})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async confirm(@Req() req: Request, @Res() res: Response, @Body(new ValidationPipe()) confirmEmailDto: ConfirmEmailDto) {

    const result = await this.accountService.confirmEmail({
      url: rootUrl(req),
      ...confirmEmailDto
    });
    if (result) {
      res.sendStatus(HttpStatus.OK);
    } else {
      throw new BadRequestException();
    }
  }

  @Roles('admin')
  @Post('approve')
  @ApiResponse({ status: HttpStatus.OK, description: "The has been successfully approved."})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async approve(@Req() req: Request, @Res() res: Response, @Body(new ValidationPipe()) approveUserDto: ApproveUserDto) {
    const body = req.body;
    const result = await this.accountService.approveUser(approveUserDto);

    if (result) {
      res.sendStatus(HttpStatus.OK);
    } else {
      throw new BadRequestException();
    }
  }

  @Post('recover/send-email')
  @ApiResponse({ status: HttpStatus.OK, description: "The user's recovery email has been successfully sent."})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async sendRecoveryEmail(@Req() req: Request, @Res() res: Response, @Body(new ValidationPipe()) recoveryEmailDto: RecoveryEmailDto) {
    const result = await this.accountService.sendRecoveryEmail({
      url: rootUrl(req),
      ...recoveryEmailDto
    });

    if (result) {
      res.sendStatus(HttpStatus.OK);
    } else {
      throw new BadRequestException();
    }
  }

  @Post('recover/reset-password')
  @ApiResponse({ status: HttpStatus.OK, description: "The user's password has been successfully reset."})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async resetPassword(@Req() _: Request, @Res() res: Response, @Body(new ValidationPipe()) resetPasswordDto: ResetPasswordDto) {

    // When using verifyConfirmationCode
    // await recovery.resetPassword(req['user'], body.new_password);
    const { id, confirmationCode, password } = resetPasswordDto;

    const hasValidCode = await this.accountService.verifyConfirmationCode({
      id,
      confirmationCode
    });

    if (!hasValidCode) {
      res.sendStatus(400);
    }

    const result = await this.accountService.resetPassword({
      id,
      confirmationCode,
      password
    });

    if (result) {
      res.sendStatus(HttpStatus.OK);
    } else {
      throw new BadRequestException();
    }
  }
}
