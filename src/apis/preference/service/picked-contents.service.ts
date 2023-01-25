import { Injectable } from '@nestjs/common';
import { PickedContentsRepository } from '../repositories/picked-contents.repo';
import { PickedContentsEntity } from '../entities/picked-contents.entity';
import { getPicked } from '../response/picked-contents.res';

@Injectable()
export class PickedContentsService {
  constructor(private pickedContentsRepo: PickedContentsRepository) {}
  async createPicked(
    profileId: string,
    contentId: string,
  ): Promise<PickedContentsEntity> {
    return await this.pickedContentsRepo.save({
      profile: { id: profileId },
      content: { id: contentId },
    });
  }

  async getPicked(profileId: string): Promise<getPicked[]> {
    return await this.pickedContentsRepo.find({
      select: {
        id: true,
        content: { id: true },
        profile: { id: true },
      },
      relations: { content: true, profile: true },
      where: { profile: { id: profileId } },
    });
  }

  async deletePicked(pickedId: string): Promise<string> {
    await this.pickedContentsRepo.delete({
      id: pickedId,
    });
    return 'successfully deleted';
  }
}
