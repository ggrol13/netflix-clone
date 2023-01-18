import { IsPassword } from '../../../common/validation/password.validation';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  email: string;

  @IsString()
  gender: string;

  @IsString()
  phoneNum: string;

  @IsPassword()
  password: string;

  @IsDateString()
  birthDate: Date;
}

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  thumbnail: string;

  @IsString()
  language: string;

  @IsNumber()
  ageLimit: number;
}
