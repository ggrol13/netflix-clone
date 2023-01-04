import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAccountDto, CreateProfileDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User, UserType } from '../../common/decorator/user.decorator';
import { Role } from '../../common/type/role.type';
import { Roles } from '../../common/decorator/role.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * create user
   **/
  @Post()
  async create(@Body() dto: CreateAccountDto) {
    return await this.userService.create(dto);
  }

  /**
   * get profiles
   **/
  @Get('profiles')
  @Roles(Role.Account)
  async getProfiles(@User() user: UserType) {
    return await this.userService.getProfiles(user);
  }

  /**
   * create profile
   **/
  @Post('profile')
  @Roles(Role.Account)
  async createProfile(
    @Body() dto: CreateProfileDto,
    @User() { accountId }: UserType,
  ) {
    return await this.userService.createProfile(dto, accountId);
  }

  /**
   * delete profile
   **/
  @Delete('profile/:profileId')
  @Roles(Role.Account)
  deleteProfile(@Param('profileId') profileId: string) {
    return this.userService.deleteProfile(profileId);
  }

  /**
   * login profile
   **/
  @Post('profile/:profileId')
  @Roles(Role.Account)
  async loginProfile(
    @User() user: UserType,
    @Param('profileId') profileId: string,
  ) {
    return await this.userService.loginProfile(user, profileId);
  }
}
