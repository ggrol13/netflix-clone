import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-user.dto';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class UserService {
  constructor(private readonly accountRepo: AccountRepository) {}

  async create(dto: CreateAccountDto) {
    return await this.accountRepo.save({
      ...dto,
    });
  }
}
