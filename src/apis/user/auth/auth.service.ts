import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { AccountLoginDto } from '../dto/create-user.dto';
import { hash } from 'typeorm/util/StringUtils';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('AuthService');
    const user = await this.usersService.findOneByEmail(email, password);
    console.log(user);
    if (user && user.password === hash(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, user: any) {
    const payload = { email };
    return {
      ...user,
      access_token: this.jwtService.sign(payload, jwtConstants),
    };
  }
}
