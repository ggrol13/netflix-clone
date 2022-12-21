import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AccountEntity } from '../../user/entities/account.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(
    email: string,
    password: string,
    done: CallableFunction,
  ): Promise<AccountEntity> {
    const auth = await this.authService.validateUser(email, password);
    if (!auth) {
      throw new UnauthorizedException();
    }
    const user = {
      email: auth.email,
      id: auth.id,
    };
    return done(null, user);
  }
}
