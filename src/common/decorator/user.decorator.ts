import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export interface UserType {
  accountId: string;
  email: string;
  role: string;
}

export interface ProfileType {
  name: string;
  accountId: string;
  role: string;
}

export const User = createParamDecorator<any, any, UserType>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
