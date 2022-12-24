import { ProfileEntity } from '../entities/profile.entity';
import { OmitType, PickType } from '@nestjs/swagger';
import { AccountEntity } from '../entities/account.entity';

export class CreateProfileResponse extends PickType(ProfileEntity, [
  'id',
  'name',
  'thumbnail',
  'language',
  'ageLimit',
  'createdAt',
  'updatedAt',
]) {
  account: { id: string };
}

export class CreateUserResponse extends PickType(AccountEntity, [
  'id',
  'email',
  'gender',
  'phoneNum',
  'birthDate',
  'level',
  'createdAt',
  'updatedAt',
]) {}

export class GetProfilesResponse extends OmitType(CreateProfileResponse, [
  'account',
]) {}
