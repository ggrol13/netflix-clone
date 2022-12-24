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

@Injectable()
export class LevelOneStrategy extends PassportStrategy(Strategy, 'levelOne') {
  constructor(private configService: ConfigService) {
    super();
  }

  async validate(req: Request) {
    const token = req.headers['authorization']?.slice(7);

    if (!token) {
      throw new BadRequestException('There is no access token in header');
    }

    try {
      const accessDecoded = JSON.parse(JSON.stringify(jwt.decode(token)));
      if (accessDecoded.level > 1) {
        throw new UnauthorizedException('Level is lower');
      }
      return {
        email: accessDecoded.email,
        accountId: accessDecoded.accountId,
        level: accessDecoded.level,
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
