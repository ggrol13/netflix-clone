import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenDto } from '../../apis/auth/dto/token.dto';

export interface NewAccessTokenType {
  accessToken: string;
}

export const NewAccessToken = createParamDecorator<any, any, TokenDto>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
