import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './v2/account.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super();
  }

  async validate(token: any, done: Function) {
    try {
      const user = await this.accountService.validateUser(token);

      if (!user) {
        return done(new UnauthorizedException(), false);
      }
      if (user.disabled) {
        return done(new UnauthorizedException(), false);
      }
      done(null, user);
    } catch (error) {
      return done(new UnauthorizedException(), false);
    }
  }
}
