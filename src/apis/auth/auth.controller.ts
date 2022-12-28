import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './service/auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { User, UserType } from '../../common/decorator/user.decorator';
import { LoginDto } from './dto/auth.dto';
import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { TokenService } from './service/token.service';
import { ResponseInterceptor } from '../../common/interceptor/responseInterceptor';

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
  @UseInterceptors(ResponseInterceptor)
  async login(@Body() dto: LoginDto, @User() user: UserType) {
    return this.authService.login(user);
  }

  /**
   * auth recreate AccessToken
   **/
  @UseGuards(RefreshTokenGuard)
  @Post('refreshToken')
  @UseInterceptors(ResponseInterceptor)
  async token(@User() user: UserType) {
    const accessToken = this.tokenService.createAccessToken(user);

    if (!accessToken['iat']) {
      return {
        success: false,
        error: accessToken,
      };
    }
    return {
      success: true,
      data: accessToken,
    };
  }
}
