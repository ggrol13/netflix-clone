import { ProfileEntity } from '../entities/profile.entity';
import { PickType } from '@nestjs/swagger';

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
