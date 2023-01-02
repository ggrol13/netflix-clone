import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from './entities/account.entity';
import { ProfileRepository } from './repositories/profile.repository';
import { APP_GUARD } from '@nestjs/core';
import { UniversalGuard } from '../auth/guard/universal.guard';
import { TokenService } from '../auth/service/token.service';
import { JwtService } from '@nestjs/jwt';
import { UniversalStrategy } from '../auth/strategy/universal.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    TokenService,
    JwtService,
    AccountRepository,
    UniversalStrategy,
    ProfileRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
