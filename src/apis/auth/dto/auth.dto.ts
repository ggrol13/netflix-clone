import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { IsPassword } from '../../../common/validation/password.validation';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPassword()
  password: string;
}
