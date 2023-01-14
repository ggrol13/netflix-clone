import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../type/role.type';

export interface UserType {
  accountId: string;
  email: string;
  role: string;
}

export interface ProfileType {
  name: string;
  accountId: string;
  profileId: string;
  role: string;
}

export const User = createParamDecorator<any, any, UserType>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const Profile = createParamDecorator<any, any, ProfileType>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
