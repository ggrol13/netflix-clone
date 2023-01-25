import { Injectable } from '@nestjs/common';
import { CreateWatchingDto } from '../dto/watching.dto';
import { ProfileType } from '../../../common/decorator/user.decorator';
import { WatchingRepository } from '../repositories/watching.repo';
import { WatchingEntity } from '../entities/watching.entity';
import { UpdateWatchingResponse } from '../response/watching.res';

@Injectable()
export class WatchingService {
  constructor(private watchingRepo: WatchingRepository) {}
  async createWatching(
    dto: CreateWatchingDto,
    contentId: string,
    profile: ProfileType,
    episodeId: string,
  ): Promise<WatchingEntity> {
    return await this.watchingRepo.save({
      ...dto,
      profile: { id: profile.profileId },
      content: { id: contentId },
      episode: { id: episodeId },
    });
  }

  async updateWatching(
    dto: CreateWatchingDto,
    profile: ProfileType,
    watchingId: string,
  ): Promise<UpdateWatchingResponse> {
    try {
      await this.watchingRepo.update(
        {
          id: watchingId,
        },
        { timeStamp: dto.timeStamp },
      );
      const { timeStamp } = dto;
      return { id: watchingId, timeStamp };
    } catch (e) {
      throw e;
    }
  }

  async getLatestWatching(profileId: string) {
    return await this.watchingRepo.findOne({
      where: { profile: { id: profileId } },
      order: { updatedAt: 'DESC' },
    });
  }

  async getWatching(profileId: string) {
    return await this.watchingRepo.find({
      where: { profile: { id: profileId } },
      order: { updatedAt: 'DESC' },
    });
  }
}
