import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAccountDto, CreateProfileDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * create user
   **/
  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.userService.create(dto);
  }

  /**
   * create profile
   **/
  @Post('profile')
  createProfile(@Body() dto: CreateProfileDto) {
    return this.userService.createProfile(dto);
  }

  /**
   * delete profile
   **/
  @Delete('profile/:profileId')
  deleteProfile(@Param('profileId') profileId: string) {
    return this.userService.deleteProfile(profileId);
  }
}
