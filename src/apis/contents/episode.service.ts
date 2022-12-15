import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto, CreateSeasonDto } from './dto/create-content.dto';
import { UpdateEpisodeDto, UpdateSeasonDto } from './dto/update-content.dto';

@Injectable()
export class EpisodeService {
  createSeason(createSeasonDto: CreateSeasonDto) {
    return 'This action adds a new season';
  }

  findAllSeason() {
    return `This action returns all seasons`;
  }

  findOneSeason(id: number) {
    return `This action returns a #${id} season`;
  }

  updateSeason(id: number, updateSeasonDto: UpdateSeasonDto) {
    return `This action updates a #${id} season`;
  }

  removeSeason(id: number) {
    return `This action removes a #${id} season`;
  }

  createEp(createEpisodeDto: CreateEpisodeDto) {
    return 'This action adds a new episode';
  }

  findAllEp() {
    return `This action returns all episodes`;
  }

  findOneEp(id: number) {
    return `This action returns a #${id} episode`;
  }

  updateEp(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  removeEp(id: number) {
    return `This action removes a #${id} episode`;
  }
}
