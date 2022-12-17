import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [UserController],
  providers: [UserService, AccountRepository],
})
export class UserModule {}
