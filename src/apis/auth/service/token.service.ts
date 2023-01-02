import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ProfileType,
  UserType,
} from '../../../common/decorator/user.decorator';
import { ConfigService } from '@nestjs/config';
import { TokenDto } from '../dto/token.dto';

@Injectable()
export class TokenService {
  private HOUR = 3600;
  private DAY = this.HOUR * 24;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createAccessToken(user: UserType): string {
    try {
      return this.jwtService.sign(
        { ...user, role: 'account' },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.HOUR,
        },
      );
    } catch (e) {
      return e;
    }
  }

  createRefreshToken(user: UserType): string {
    return this.jwtService.sign(
      { ...user, role: 'account' },
      {
        secret: this.configService.get('REFRESH_SECRET'),
        expiresIn: this.DAY * 30,
      },
    );
  }

  createProfileAccessToken(profile: ProfileType): string {
    return this.jwtService.sign(profile, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.HOUR,
    });
  }

  createProfileRefreshToken(profile: ProfileType): string {
    return this.jwtService.sign(profile, {
      secret: this.configService.get('REFRESH_SECRET'),
      expiresIn: this.DAY * 30,
    });
  }
}
