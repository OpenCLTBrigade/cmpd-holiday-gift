import { Guard, CanActivate } from '@nestjs/common';

@Guard()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(req): boolean {
    return req.user && req.user.active && req.user.approved;
  }
}
