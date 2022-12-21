import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  AccountLoginDto,
  CreateAccountDto,
  CreateProfileDto,
} from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { User, UserDecoratorType } from '../../common/decorator/user.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * create user
   **/
  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.userService.create(dto);
  }

  /**
   * user login
   **/
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: AccountLoginDto, @User() user: UserDecoratorType) {
    console.log(user);
    //return this.authService.login(dto.email, user);
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
