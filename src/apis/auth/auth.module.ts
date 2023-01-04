import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TokenService } from './service/token.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtService,
    TokenService,
    ConfigService,
  ],
})
export class AuthModule {}
