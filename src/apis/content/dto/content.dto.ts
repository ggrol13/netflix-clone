import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  cast: string;

  @IsString()
  detail: string;

  @IsString()
  ageLimit: string;

  @IsString()
  year: string;

  @IsString()
  contentType: string;

  @IsString()
  language: string;

  @IsString({ each: true })
  genre: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EpisodeOnly)
  episode?: EpisodeOnly[];

  @IsString({ each: true })
  @IsOptional()
  seasonNum: string[] | null;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDubbingDto)
  dubbing?: CreateDubbingDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSubtitleDto)
  subtitle?: CreateSubtitleDto[];
}

export class CreateGenreDto {
  @IsString({ each: true })
  genre: string[];
}

export class CreateSeasonDto {
  @IsString({ each: true })
  seasonNum: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EpisodeOnly)
  episode: EpisodeOnly[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDubbingDto)
  dubbing?: CreateDubbingDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSubtitleDto)
  subtitle?: CreateSubtitleDto[];
}

export class CreateEpisodeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EpisodeOnly)
  episode: EpisodeOnly[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDubbingDto)
  dubbing?: CreateDubbingDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSubtitleDto)
  subtitle?: CreateSubtitleDto[];
}

export class CreateDubbingDto {
  @IsString()
  episodeName: string;

  @IsString()
  language: string;
}

export class CreateSubtitleDto {
  @IsString()
  episodeName: string;

  @IsString()
  language: string;
}

export class EpisodeOnly {
  @IsString()
  name: string;

  @IsString()
  detail: string;

  @IsString()
  seasonNum: string | null;
}

export class DeleteEpSubDto {
  @IsString({ each: true })
  ids: string[];
}
