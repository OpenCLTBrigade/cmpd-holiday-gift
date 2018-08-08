import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './v2/account.service';
import { logger } from 'cmpd-common-api';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super();
  }

  async validate(token: any, done: Function) {
    logger.info('validate token');

    try {
      const user = await this.accountService.validateUser(token);

      if (!user) {
        logger.info('user not found');

        return done(new UnauthorizedException(), false);
      }
      if (user.disabled) {
        logger.info('user found, but disabled');
        return done(new UnauthorizedException(), false);
      }
      done(null, user);
    } catch (error) {
      logger.error('unknown auth error', error);
      return done(new UnauthorizedException(), false);
    }
  }
}
