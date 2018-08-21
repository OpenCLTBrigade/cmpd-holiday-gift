import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountService } from './account.service';
import { logger } from 'cmpd-common-api';

const getToken = req => {
  let authorization;
  if (req.headers.authorization) {
    authorization = req.headers.authorization;
  } else if (req.body && req.body.__authorization) {
    authorization = req.body.__authorization;
  }
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext) {
    const handler = context.getHandler();
    const roles = this.reflector.get<string[]>('roles', handler);
    const request = context.switchToHttp().getRequest();

    if (!roles) {
      return true;
    }
    const token = getToken(request);
    const user = await this.accountService.validateUser(token);

    const hasClaim = roles.some(role => user.claims.nominations[role]);

    return hasClaim;
  }
}
