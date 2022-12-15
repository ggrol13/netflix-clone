import { PartialType } from '@nestjs/mapped-types';
import {
  CreateContentDto,
  CreateDubbingDto,
  CreateEpisodeDto,
  CreateGenreDto,
  CreateSeasonDto,
  CreateSubtitleDto,
} from './create-content.dto';

export class UpdateContentDto extends PartialType(CreateContentDto) {}

export class UpdateDubbingDto extends PartialType(CreateDubbingDto) {}

export class UpdateEpisodeDto extends PartialType(CreateEpisodeDto) {}

export class UpdateSeasonDto extends PartialType(CreateSeasonDto) {}

export class UpdateSubtitleDto extends PartialType(CreateSubtitleDto) {}

export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
