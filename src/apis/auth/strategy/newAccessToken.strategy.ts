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
export class NewAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'newAccessToken',
) {
  private HOUR = 3600;

  constructor(private configService: ConfigService) {
    super();
  }

  async validate(req: Request) {
    const token = req.headers['authorization']?.slice(7);

    if (!token) {
      throw new BadRequestException('There is no access token in header');
    }

    try {
      jwt.verify(token, this.configService.get('JWT_SECRET'));
      const accessDecoded = JSON.parse(JSON.stringify(jwt.decode(token)));
      const body = JSON.parse(JSON.stringify(req.body));
      const refreshDecoded = JSON.parse(
        JSON.stringify(jwt.decode(body.refreshToken)),
      );
      let payload;
      if (
        accessDecoded.email === refreshDecoded.email &&
        accessDecoded.accountId === refreshDecoded.accountId
      ) {
        payload = {
          email: accessDecoded.email,
          accountId: accessDecoded.accountId,
        };
        const accessToken = jwt.sign(
          payload,
          this.configService.get('JWT_SECRET'),
          { expiresIn: this.HOUR },
        );
        return {
          accessToken,
        };
      }
      return null;
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
