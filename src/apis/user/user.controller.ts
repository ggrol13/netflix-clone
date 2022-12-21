import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  AccountLoginDto,
  CreateAccountDto,
  CreateProfileDto,
} from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly localStrategy: LocalStrategy,
  ) {}

  /**
   * create user
   **/
  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: AccountLoginDto) {
    const user = await this.localStrategy.validate(dto.email, dto.password);
    return this.authService.login(dto.email, user);
  }

  @Post('profile')
  createProfile(@Body() dto: CreateProfileDto) {
    return this.userService.createProfile(dto);
  }

  @Delete('profile/:profileId')
  deleteProfile(@Param('profileId') profileId: string) {
    return this.userService.deleteProfile(profileId);
  }
}
