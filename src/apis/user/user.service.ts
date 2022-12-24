import { Injectable } from '@nestjs/common';
import { CreateAccountDto, CreateProfileDto } from './dto/user.dto';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from './entities/account.entity';
import { hash } from 'typeorm/util/StringUtils';
import { ProfileRepository } from './repositories/profile.repository';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import {
  CreateProfileResponse,
  GetProfilesResponse,
} from './response/user.response';
import { UserType } from '../../common/decorator/user.decorator';
import { ProfileEntity } from './entities/profile.entity';

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

  async createProfile(
    dto: CreateProfileDto,
    accountId: string,
  ): Promise<CreateProfileResponse> {
    return await this.profileRepo.save({
      ...dto,
      account: { id: accountId },
    });
  }

  async findOneByProfileID(profileId: string) {
    return await this.profileRepo.findOneBy({
      id: profileId,
    });
  }

  async deleteProfile(id: string): Promise<string | null> {
    try {
      await this.profileRepo.delete({ id });
      return 'successfully deleted';
    } catch (e) {
      return null;
    }
  }

  async getProfiles(user: UserType): Promise<ProfileEntity[]> {
    const profiles = await this.profileRepo.find({
      where: { account: { id: user.accountId } },
    });
    return profiles;
  }
}
