import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const [req] = context.getArgs();
    const roles = this.reflector.get<string[]>('roles', handler);
    if (!roles) {
      return true;
    }

    const { role = 'none', roles: userRoles = [role] } = req.user;

    const hasRole = () => !!userRoles.find(role => !!roles.find(item => item === role));

    console.log(userRoles);
    console.log(hasRole());

    return hasRole();
  }
}
