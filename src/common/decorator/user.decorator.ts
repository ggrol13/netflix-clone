import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserDecoratorType {
  id: string;
  email: string;
}

export const User = createParamDecorator<any, any, UserDecoratorType>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
