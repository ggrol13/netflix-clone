import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from '../dto/preference.dto';
import { PreferenceRepository } from '../repositories/preference.repo';
import { PreferenceEntity } from '../entities/preference.entity';

@Injectable()
export class PreferenceService {
  constructor(private preferenceRepo: PreferenceRepository) {}
  async createPreference(
    dto: CreatePreferenceDto,
    contentId: string,
    profileId: string,
  ): Promise<PreferenceEntity> {
    return await this.preferenceRepo.save({
      ...dto,
      content: { id: contentId },
      profile: { id: profileId },
    });
  }
  async deletePreference(preferenceId: string): Promise<string> {
    await this.preferenceRepo.delete({
      id: preferenceId,
    });
    return 'successfully deleted';
  }
}
