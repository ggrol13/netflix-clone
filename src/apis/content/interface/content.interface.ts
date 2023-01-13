import { OmitType } from '@nestjs/swagger';
import { CreateContentDto, CreateEpisodeDto } from '../dto/content.dto';

export class ContentSave extends OmitType(CreateContentDto, [
  'genre',
  'episode',
  'dubbing',
  'seasonNum',
  'subtitle',
]) {}

export class EpisodeSave extends OmitType(CreateEpisodeDto, [
  'dubbing',
  'subtitle',
]) {}
