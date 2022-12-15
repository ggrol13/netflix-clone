import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-user.dto';

@Injectable()
export class ProfileService {
  createProfile(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAllProfile() {
    return `This action returns all profile`;
  }

  findOneProfile(id: number) {
    return `This action returns a #${id} profile`;
  }

  updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  removeProfile(id: number) {
    return `This action removes a #${id} profile`;
  }
}
