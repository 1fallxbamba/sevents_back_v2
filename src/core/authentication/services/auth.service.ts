import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findUser(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  saveUser(user: User) {
    return this.userRepository.save(user);
  }
}
