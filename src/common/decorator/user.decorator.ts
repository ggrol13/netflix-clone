import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserType {
  accountId: string;
  email: string;
  level: number;
}

export interface ProfileType {
  name: string;
  accountId: string;
  level: number;
}

export const User = createParamDecorator<any, any, UserType>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
