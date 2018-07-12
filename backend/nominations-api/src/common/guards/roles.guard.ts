import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountService } from '../../modules/auth/v2/account.service';

@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const handler = context.getHandler();
    const [req] = context.getArgs();
    const roles = this.reflector.get<string[]>('roles', handler);

    if (!roles) {
      return true;
    }

    const { user } = req;
    const hasClaim = roles.some(role => user[role]);

    return hasClaim;
  }
}
