import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from './entities/account.entity';
import { ProfileRepository } from './repositories/profile.repository';
import { LevelOneStrategy } from '../auth/strategy/levelOne.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    AccountRepository,
    ProfileRepository,
    LevelOneStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
