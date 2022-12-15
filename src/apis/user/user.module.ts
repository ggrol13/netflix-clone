import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ProfileService],
})
export class UserModule {}
