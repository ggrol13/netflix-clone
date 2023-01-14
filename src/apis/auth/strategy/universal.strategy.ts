import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { log } from 'util';

@Injectable()
export class UniversalStrategy extends PassportStrategy(Strategy, 'universal') {
  private parseToken = ExtractJwt.fromAuthHeaderAsBearerToken();

  constructor(private configService: ConfigService) {
    super();
  }

  async validate(req: Request) {
    const role = req.role;
    const token = this.parseToken(req);
    if (!role) {
      return { data: null };
    }
    if (role === 'refresh') {
      const refreshTokenVerified = await this.verifyRefreshToken(req, token);
      return refreshTokenVerified;
    }
    const accessTokenVerified = await this.verifyAccessToken(req, token);
    return accessTokenVerified;
  }

  async verifyAccessToken(req: Request, accessToken: string) {
    if (!accessToken) {
      throw new BadRequestException('There is no access token in header');
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        this.configService.get('JWT_SECRET'),
      );
      if (decoded['role'] !== req.role) {
        throw new UnauthorizedException('Role is differ with as required');
      }
      return decoded;
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

  async verifyRefreshToken(req: Request, accessToken: string) {
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
      if (accessDecoded['profileId']) {
        return {
          email: accessDecoded['email'],
          accountId: accessDecoded['accountId'],
          role: accessDecoded['role'],
          profileId: accessDecoded['profileId'],
        };
      }

      return {
        email: accessDecoded['email'],
        accountId: accessDecoded['accountId'],
        role: accessDecoded['role'],
      };
    } catch (e) {
      if (e instanceof SyntaxError) {
        // payload가 잘 못 되었을 때 (base64 decode가 안되는 경우 등)
        throw new BadRequestException('Invalid JSON object');
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
