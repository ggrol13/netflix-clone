import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto, CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
