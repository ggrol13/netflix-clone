import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAccountDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.userService.create(dto);
  }
}
