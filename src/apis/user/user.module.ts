import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from './entities/account.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { ProfileRepository } from './repositories/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    AccountRepository,
    AuthService,
    JwtService,
    LocalStrategy,
    ProfileRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
