import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from './entities/account.entity';
import { ProfileRepository } from './repositories/profile.repository';
import { TokenService } from '../auth/service/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    JwtService,
    TokenService,
    AccountRepository,
    ProfileRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
