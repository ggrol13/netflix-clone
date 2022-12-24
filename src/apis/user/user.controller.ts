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
import { LevelOneAuthGuard } from '../auth/guard/levelOne-auth.guard';
import {
  CreateUserResponse,
  GetProfilesResponse,
} from './response/user.response';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * create user
   **/
  @Post()
  async create(@Body() dto: CreateAccountDto) {
    return this.userService.create(dto);
  }

  /**
   * get profiles
   **/
  @UseGuards(LevelOneAuthGuard)
  @Get('profiles')
  async getProfiles(@User() user: UserType) {
    return this.userService.getProfiles(user);
  }

  /**
   * create profile
   **/
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  createProfile(
    @Body() dto: CreateProfileDto,
    @User() { accountId }: UserType,
  ) {
    return this.userService.createProfile(dto, accountId);
  }

  /**
   * delete profile
   **/
  @Delete('profile/:profileId')
  deleteProfile(@Param('profileId') profileId: string) {
    return this.userService.deleteProfile(profileId);
  }
}
