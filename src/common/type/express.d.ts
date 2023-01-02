import { Role } from './role.type';

export {};

declare global {
  namespace Express {
    export interface Request {
      role?: Role | null;
    }
  }
}
