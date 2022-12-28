import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { hash } from 'typeorm/util/StringUtils';
import { AccountEntity } from '../../user/entities/account.entity';
import { UserType } from '../../../common/decorator/user.decorator';
import { TokenService } from './token.service';
import { LoginResponse } from '../response/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private tokenService: TokenService,
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

  async login(user: UserType): Promise<LoginResponse> {
    return {
      accessToken: this.tokenService.createAccessToken(user),
      refreshToken: this.tokenService.createRefreshToken(user),
    };
  }
}
