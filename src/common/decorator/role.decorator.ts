import { SetMetadata } from '@nestjs/common';
import { Role } from '../type/role.type';

export const Roles = (role: Role) => SetMetadata('role', role);
