import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { WatchingEntity } from '../entities/watching.entity';

@Injectable()
export class WatchingRepository extends Repository<WatchingEntity> {
  constructor(private dataSource: DataSource) {
    super(WatchingEntity, dataSource.createEntityManager());
  }
}
