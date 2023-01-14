import { Injectable } from '@nestjs/common';
import { CreateWatchingDto } from './dto/create-history.dto';
import { UpdateWatchingDto } from './dto/update-history.dto';
import { ProfileType } from '../../common/decorator/user.decorator';
import { WatchingRepository } from './repositories/watching.repo';
import { WatchingEntity } from './entities/watching.entity';

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

  findAllWatching() {
    return `This action returns all watching`;
  }

  findOneWatching(id: number) {
    return `This action returns a #${id} watching`;
  }

  updateWatching(id: number, updateWatchingDto: UpdateWatchingDto) {
    return `This action updates a #${id} watching`;
  }

  removeWatching(id: number) {
    return `This action removes a #${id} watching`;
  }
}
