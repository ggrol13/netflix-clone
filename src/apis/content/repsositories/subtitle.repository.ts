import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SubtitleEntity } from '../entities/subtitle.entity';

@Injectable()
export class SubtitleRepository extends Repository<SubtitleEntity> {
  constructor(private dataSource: DataSource) {
    super(SubtitleEntity, dataSource.createEntityManager());
  }
}
