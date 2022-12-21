import { Injectable } from '@nestjs/common';
import {
  AccountLoginDto,
  CreateAccountDto,
  CreateProfileDto,
} from './dto/create-user.dto';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from './entities/account.entity';
import { hash } from 'typeorm/util/StringUtils';
import { ProfileRepository } from './repositories/profile.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly profileRepo: ProfileRepository,
  ) {}

  async create(dto: CreateAccountDto): Promise<AccountEntity> {
    dto.password = hash(dto.password);
    return await this.accountRepo.save({
      ...dto,
    });
  }

  async findOneByEmail(
    email: string,
    password: string,
  ): Promise<AccountEntity> {
    password = hash(password);
    return await this.accountRepo.findOneBy({ email, password });
  }

  async createProfile(dto: CreateProfileDto) {
    return await this.profileRepo.save({ ...dto });
  }

  async deleteProfile(id: string) {
    return await this.profileRepo.delete({ id });
  }
}
