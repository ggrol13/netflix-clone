import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AccountLoginDto } from '../user/dto/create-user.dto';
import { hash } from 'typeorm/util/StringUtils';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategy/local.strategy';
import { AccountEntity } from '../user/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AccountEntity | null> {
    const user = await this.usersService.findOneByEmail(email, password);
    if (user && user.password === hash(password)) {
      return user;
    }
    return null;
  }

  async login(email: string, user: AccountEntity) {
    const payload = { email };
    const { ['password']: password, ...userNoPW } = user;

    return {
      ...userNoPW,
      access_token: this.jwtService.sign(payload, jwtConstants),
    };
  }
}
