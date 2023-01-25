import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PreferenceEntity } from '../entities/preference.entity';

@Injectable()
export class PreferenceRepository extends Repository<PreferenceEntity> {
  constructor(private dataSource: DataSource) {
    super(PreferenceEntity, dataSource.createEntityManager());
  }
}
