export class CreateAccountDto {
  email: string;
  gender: string;
  phoneNum: string;
  password: string;
  birthDate: Date;
}

export class CreateProfileDto {
  name: string;
  thumbnail: string;
  language: string;
  ageLimit: number;
  accountId: string;
}

export class AccountLoginDto {
  email: string;
  password: string;
}
