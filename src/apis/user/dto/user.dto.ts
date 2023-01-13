import { IsPassword } from '../../../common/validation/password.validation';
import { IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  email: string;
  gender: string;
  phoneNum: string;

  @IsPassword()
  password: string;
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
