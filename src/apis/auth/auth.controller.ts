import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './service/auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { User, UserType } from '../../common/decorator/user.decorator';
import { LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * auth login
   **/
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto, @User() user: UserType) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test(@User() user: UserType) {
    return user;
  }
}
