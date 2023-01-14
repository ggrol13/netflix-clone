import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto, CreateProfileDto } from './dto/user.dto';
import { AccountRepository } from './repositories/account.repository';
import { AccountEntity } from './entities/account.entity';
import { hash } from 'typeorm/util/StringUtils';
import { ProfileRepository } from './repositories/profile.repository';
import {
  CreateProfileResponse,
  CreateUserResponse,
  GetProfilesResponse,
} from './response/user.response';
import { UserType } from '../../common/decorator/user.decorator';
import { LoginResponse } from '../auth/response/auth.response';
import { TokenService } from '../auth/service/token.service';

@Injectable()
export class UserService {
  constructor(
    private readonly accountRepo: AccountRepository,
    private readonly profileRepo: ProfileRepository,
    private readonly tokenService: TokenService,
  ) {}

  async create(dto: CreateAccountDto): Promise<CreateUserResponse> {
    dto.password = hash(dto.password);
    try {
      return await this.accountRepo.save({
        ...dto,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
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
    try {
      return await this.profileRepo.save({
        ...dto,
        account: { id: accountId },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteProfile(id: string): Promise<string> {
    try {
      await this.profileRepo.delete({ id });
      return 'successfully deleted';
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getProfiles(user: UserType): Promise<GetProfilesResponse> {
    return await this.accountRepo.findOne({
      select: {
        id: true,
        phoneNum: true,
        profile: {
          id: true,
          name: true,
          thumbnail: true,
          ageLimit: true,
        },
      },
      relations: {
        profile: true,
      },
      where: {
        id: user.accountId,
      },
    });
  }

  async loginProfile(
    user: UserType,
    profileId: string,
  ): Promise<LoginResponse> {
    try {
      const profile = await this.profileRepo.findOne({
        relations: { account: true },
        where: { id: profileId, account: { id: user.accountId } },
      });
      const payload = {
        name: profile.name,
        accountId: user.accountId,
        profileId: profileId,
        role: 'profile',
      };
      return {
        accessToken: this.tokenService.createProfileAccessToken(payload),
        refreshToken: this.tokenService.createProfileRefreshToken(payload),
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
