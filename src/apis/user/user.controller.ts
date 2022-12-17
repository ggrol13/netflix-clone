import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAccountDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  //profile
  @Post('profile')
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.createProfile(createProfileDto);
  }

  @Get('profile')
  findAllProfile() {
    return this.profileService.findAllProfile();
  }

  @Get('profile/:id')
  findOneProfile(@Param('id') id: string) {
    return this.profileService.findOneProfile(+id);
  }

  @Patch('profile/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(+id, updateProfileDto);
  }

  @Delete('profile/:id')
  removeProfile(@Param('id') id: string) {
    return this.profileService.removeProfile(+id);
  }
}
