import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAccountDto, CreateProfileDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User, UserType } from '../../common/decorator/user.decorator';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorator/role.decorator';
import { ResponseInterceptor } from '../../common/interceptor/responseInterceptor';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * create user
   **/
  @Post()
  @UseInterceptors(ResponseInterceptor)
  async create(@Body() dto: CreateAccountDto) {
    const user = await this.userService.create(dto);
    if (!user.email) {
      return {
        success: false,
        error: user,
      };
    }
    return {
      success: true,
      data: user,
    };
  }

  /**
   * get profiles
   **/
  @UseGuards(JwtAuthGuard)
  @Get('profiles')
  @Roles(Role.Account)
  @UseInterceptors(ResponseInterceptor)
  async getProfiles(@User() user: UserType) {
    return this.userService.getProfiles(user);
  }

  /**
   * create profile
   **/
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @Roles(Role.Account)
  @UseInterceptors(ResponseInterceptor)
  async createProfile(
    @Body() dto: CreateProfileDto,
    @User() { accountId }: UserType,
  ) {
    const profile = await this.userService.createProfile(dto, accountId);

    if (!profile['name']) {
      return {
        success: false,
        error: profile,
      };
    }
    return {
      success: true,
      data: profile,
    };
  }

  /**
   * delete profile
   **/
  @UseGuards(JwtAuthGuard)
  @Delete('profile/:profileId')
  @Roles(Role.Account)
  deleteProfile(@Param('profileId') profileId: string) {
    return this.userService.deleteProfile(profileId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile/:profileId')
  @Roles(Role.Account)
  @UseInterceptors(ResponseInterceptor)
  async loginProfile(
    @User() user: UserType,
    @Param('profileId') profileId: string,
  ) {
    const profile = this.userService.loginProfile(user, profileId);

    if (!profile['name']) {
      return {
        success: false,
        error: profile,
      };
    }
    return {
      success: true,
      data: profile,
    };
  }
}
