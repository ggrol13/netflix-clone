import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AccountEntity } from '../../user/entities/account.entity';
import { UserType } from '../../../common/decorator/user.decorator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(
    email: string,
    password: string,
    done: CallableFunction,
  ): Promise<UserType> {
    const auth = await this.authService.validateUser(email, password);
    if (!auth) {
      throw new UnauthorizedException();
    }
    const user: UserType = {
      email: auth.email,
      accountId: auth.id,
      role: 'account',
    };
    return done(null, user);
  }
}
