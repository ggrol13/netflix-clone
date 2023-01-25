import { Module } from '@nestjs/common';
import { PreferenceService } from './service/preference.service';
import { PreferenceController } from './preference.controller';
import { PickedContentsService } from './service/picked-contents.service';
import { PreferenceRepository } from './repositories/preference.repo';
import { PickedContentsRepository } from './repositories/picked-contents.repo';

@Module({
  controllers: [PreferenceController],
  providers: [
    PreferenceService,
    PickedContentsService,
    PreferenceRepository,
    PickedContentsRepository,
  ],
})
export class PreferenceModule {}
