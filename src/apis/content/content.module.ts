import { Module } from '@nestjs/common';
import { ContentService } from './service/content.service';
import { ContentController } from './content.controller';
import { TranslationService } from './service/translation.service';
import { EpisodeService } from './service/episode.service';
import { ContentRepository } from './repsositories/contents.repository';
import { GenreRepository } from './repsositories/genre.repository';
import { EpisodeRepository } from './repsositories/episode.repository';
import { SeasonRepository } from './repsositories/season.repository';
import { DubbingRepository } from './repsositories/dubbing.repository';
import { SubtitleRepository } from './repsositories/subtitle.repository';
import { UploadService } from '../upload/upload.service';

@Module({
  controllers: [ContentController],
  providers: [
    ContentService,
    TranslationService,
    EpisodeService,
    UploadService,
    ContentRepository,
    GenreRepository,
    EpisodeRepository,
    SeasonRepository,
    DubbingRepository,
    SubtitleRepository,
  ],
})
export class ContentModule {}
