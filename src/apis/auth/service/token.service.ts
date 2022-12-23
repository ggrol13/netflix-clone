import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../../../common/decorator/user.decorator';
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

  reCreateAccessToken({ accessToken, refreshToken }: TokenDto) {
    const accessDecoded = JSON.parse(
      JSON.stringify(this.jwtService.decode(accessToken)),
    );
    const refreshDecoded = JSON.parse(
      JSON.stringify(this.jwtService.decode(refreshToken)),
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
      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.HOUR,
      });
      return {
        accessToken,
      };
    }
    return null;
  }
}
