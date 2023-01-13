import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SeasonEntity } from '../entities/season.entity';

@Injectable()
export class SeasonRepository extends Repository<SeasonEntity> {
  constructor(private dataSource: DataSource) {
    super(SeasonEntity, dataSource.createEntityManager());
  }
}
