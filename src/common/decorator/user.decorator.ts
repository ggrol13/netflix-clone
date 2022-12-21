import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserType {
  id: string;
  email: string;
}

export const User = createParamDecorator<any, any, UserType>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
