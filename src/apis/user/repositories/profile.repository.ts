import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';

@Injectable()
export class ProfileRepository extends Repository<ProfileEntity> {
  constructor(private dataSource: DataSource) {
    super(ProfileEntity, dataSource.createEntityManager());
  }
}
