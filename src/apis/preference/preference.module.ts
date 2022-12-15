import { Module } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { PreferenceController } from './preference.controller';
import { PickedContentsService } from './picked-contents.service';

@Module({
  controllers: [PreferenceController],
  providers: [PreferenceService, PickedContentsService],
})
export class PreferenceModule {}
