import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  private HOUR = 3600;
  private parseToken = ExtractJwt.fromAuthHeaderAsBearerToken();

  constructor(private configService: ConfigService) {
    super();
  }

  async validate(req: Request) {
    const accessToken = this.parseToken(req);
    if (!accessToken) {
      throw new BadRequestException('There is no access token in header');
    }

    try {
      const accessDecoded = jwt.verify(
        accessToken,
        this.configService.get('JWT_SECRET'),
        {
          ignoreExpiration: true,
        },
      );
      const refreshDecoded = jwt.verify(
        req.cookies._rtk,
        this.configService.get('REFRESH_SECRET'),
      );
      if (
        accessDecoded['email'] !== refreshDecoded['email'] ||
        accessDecoded['accountId'] !== refreshDecoded['accountId']
      ) {
        throw new UnauthorizedException('Invalid Token');
      }
      return {
        email: accessDecoded['email'],
        accountId: accessDecoded['accountId'],
        level: accessDecoded['level'],
      };
    } catch (e) {
      if (e instanceof SyntaxError) {
        // payload가 잘 못 되었을 때 (base64 decode가 안되는 경우 등)
        throw new BadRequestException('Invalid JSON object');
      }
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token is expired');
      }
      if (e instanceof JsonWebTokenError) {
        // JwtWebTokenError should be later than TokenExpiredError
        // invalid signature | invalid token (header 깨졌을 때)
        throw new BadRequestException(e.message);
      }
      if (e instanceof JwtTypeError) {
        throw new BadRequestException('Token is not access token');
      }
      throw e;
    }
  }
}

class JwtTypeError extends Error {
  constructor(message: string) {
    super(message);
  }
}
