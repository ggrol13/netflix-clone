import { OmitType } from '@nestjs/swagger';
import { ContentEntity } from '../entities/content.entity';
import { SeasonResponse } from './season.response';

export class FindOneContentResponse extends OmitType(ContentEntity, [
  'season',
  'view',
  'createdAt',
  'updatedAt',
  'genre',
  'watching',
  'pickedContents',
  'history',
  'hasId',
  'remove',
  'save',
  'softRemove',
  'recover',
  'reload',
] as const) {
  season: SeasonResponse[];
}
