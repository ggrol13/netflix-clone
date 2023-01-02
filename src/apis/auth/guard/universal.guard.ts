import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../common/type/role.type';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class UniversalGuard extends AuthGuard('universal') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const role = this.reflector.get<Role>('role', context.getHandler());

    const req = context.switchToHttp().getRequest() as Request;
    req.role = role;

    return super.canActivate(context);
  }
}
