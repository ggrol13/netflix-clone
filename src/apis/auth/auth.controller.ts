import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './service/auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { User, UserType } from '../../common/decorator/user.decorator';
import { LoginDto } from './dto/auth.dto';
import {
  RefreshToken,
  TokenType,
} from '../../common/decorator/refresh-token.decorator';
import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { LevelOneAuthGuard } from './guard/levelOne-auth.guard';
import { RefreshTokenResponse } from './response/auth.response';
import { TokenService } from './service/token.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * auth login
   **/
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto, @User() user: UserType) {
    return this.authService.login(user);
  }

  /**
   * auth recreate AccessToken
   **/
  @UseGuards(RefreshTokenGuard)
  @Post('refreshToken')
  async token(@User() user: UserType) {
    return this.tokenService.createAccessToken(user);
  }

  /**
   * auth login profile
   **/
  @UseGuards(LevelOneAuthGuard)
  @Post('login/:profileId')
  async loginProfile(@Param('profileId') profileId, @User() user: UserType) {
    return this.authService.loginProfile(user, profileId);
  }
}
