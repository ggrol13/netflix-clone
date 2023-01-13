import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EpisodeEntity } from '../entities/episode.entity';

@Injectable()
export class EpisodeRepository extends Repository<EpisodeEntity> {
  constructor(private dataSource: DataSource) {
    super(EpisodeEntity, dataSource.createEntityManager());
  }
}
