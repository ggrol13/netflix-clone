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
import { ResponseInterceptor } from '../../common/interceptor/response.interceptor';
import { Roles } from '../../common/decorator/role.decorator';
import { Role } from '../../common/type/role.type';

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
    return await this.authService.login(user);
  }

  /**
   * auth recreate AccessToken
   **/
  @Roles(Role.Refresh)
  @Post('refreshToken')
  async token(@User() user: UserType) {
    return this.tokenService.createAccessToken(user);
  }
}
