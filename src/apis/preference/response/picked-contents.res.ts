import { PickType } from '@nestjs/swagger';
import { PickedContentsEntity } from '../entities/picked-contents.entity';

export class getPicked extends PickType(PickedContentsEntity, [
  'id',
  'content',
  'profile',
]) {}
