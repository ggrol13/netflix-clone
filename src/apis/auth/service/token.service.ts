import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../../../common/decorator/user.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  private HOUR = 3600;
  private DAY = this.HOUR * 24;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createAccessToken(user: UserType) {
    return this.jwtService.sign(user, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.HOUR,
    });
  }

  createRefreshToken(user: UserType) {
    return this.jwtService.sign(user, {
      secret: this.configService.get('REFRESH_SECRET'),
      expiresIn: this.DAY * 30,
    });
  }

  reCreateAccessToken() {}
}
