import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class AccountRepository extends Repository<AccountEntity> {
  constructor(private dataSource: DataSource) {
    super(AccountEntity, dataSource.createEntityManager());
  }
}
