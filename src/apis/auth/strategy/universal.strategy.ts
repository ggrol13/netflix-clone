import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { Request } from 'express';

@Injectable()
export class UniversalStrategy extends PassportStrategy(Strategy, 'universal') {
  async validate(req: Request) {
    console.log(req.role);
    return { data: 'data' };
  }
}
