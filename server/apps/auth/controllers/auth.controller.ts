import { Request, Response } from 'express';
import {
  Get,
  Controller,
  Post,
  Req,
  Res,
  Body,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
// import * as accountService from '../account.service';
import { rootUrl } from '../../lib/misc';
import auth from '../../lib/auth';
import config from '../../../config';
import { AccountService } from '../account.service';
import logger from '../../lib/logger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

type RegisterRequest = {
  firstname: string;
  lastname: string;
  rank: string;
  phone: string;
  affiliation: number;
  email: string;
  password: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

@UseGuards(RolesGuard)

@Controller('api/auth')
export class AuthController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async register(
    @Req() request: Request,
    @Res() res: Response,
    @Body() registerDto: RegisterRequest
  ) {
    const result = await this.accountService.register(rootUrl(request), {
      ...registerDto
    });

    if (result) {
      res.sendStatus(HttpStatus.CREATED);
    } else {
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginRequest) {
    const result = await this.accountService.login(loginDto);
    logger.info(result);

    if (result) {
      return res.json(result);
    } else {
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Post('extend')
  async extend(@Req() req: Request, @Res() res: Response) {
    //TODO: Add validation
    if (req['user'].id) {
      // TODO: extend existing session instead
      const result = await this.accountService.extend(req['user'].id);

      if (result) {
        return res.json(result);
      } else {
        res.sendStatus(HttpStatus.FORBIDDEN);
      }
    } else {
      res.sendStatus(HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(AuthGuard)
  @Post('access')
  async getToken(@Req() req: Request, @Res() res: Response) {
    //TODO: Add validation
    const body = req.body;
    if (req['user'] && auth.userCanUseApp(req['user'], body.app)) {
      res.json({
        token: auth.makeToken(
          {
            id: req['user'].id,
            role: req['user'].role,
            name_first: req['user'].name_first,
            name_last: req['user'].name_last
          },
          config.jwtSecrets[body.app],
          config.appTokenLifetime
        )
      });
    } else {
      res.status(HttpStatus.FORBIDDEN).send();
    }
  }

  @Post('confirm_email')
  async confirm(@Req() req: Request, @Res() res: Response) {
    //TODO: Add validation
    const body = req.body;

    const result = await this.accountService.confirmEmail({
      url: rootUrl(req),
      ...body
    });
    if (result) {
      res.sendStatus(HttpStatus.OK);
    } else {
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }

  @Roles('admin')
  @Post('approve')
  async approve(@Req() req: Request, @Res() res: Response) {
    const body = req.body;
    const result = await this.accountService.approveUser(body.user_id);

    if (result) {
      res.sendStatus(HttpStatus.OK);
    } else {
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }

  @Post('recover/send_email')
  async sendRecoveryEmail(@Req() req: Request, @Res() res: Response) {
    const body = req.body;
    const result = await this.accountService.sendRecoveryEmail({
      url: rootUrl(req),
      ...body
    });

    if (result) {
      res.sendStatus(HttpStatus.OK);
    } else {
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }

  @Post('recover/reset_password')
  async resetPassword(@Req() req: Request, @Res() res: Response) {
    const body = req.body;
    //TODO: Add validation that confirmation, password, and id are present.

    // When using verifyConfirmationCode
    // await recovery.resetPassword(req['user'], body.new_password);
    const { id, confirmationCode, password } = body;

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
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }
}
