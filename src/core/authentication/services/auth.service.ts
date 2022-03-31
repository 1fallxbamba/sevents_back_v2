import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.model';
import { LoginData } from '../models/login-data.model';
import { verifyPassword } from '../../../extra/helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  findUser(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  saveUser(user: User) {
    return this.userRepository.save(user);
  }

  async authenticateUser(loginData: LoginData) {
    const existing = await this.findUser(loginData.email);

    if (existing) {
      const passwordsMatch = await verifyPassword(
        loginData.password,
        existing.password,
      );
      if (passwordsMatch) {
        if (existing.active) {
          delete existing.password; //find another way to exclude it
          delete existing.active;
          return {
            requestStatus: 'SUCCESS',
            message: 'Login successful',
            data: existing,
            accessToken: this.jwtService.sign(loginData),
          };
        } else {
          return {
            requestStatus: 'ERROR',
            message: {
              en: 'Inactive account.',
              fr: `Votre compte est en cours de validation, merci de patienter !`,
            },
          };
        }
      } else {
        return {
          requestStatus: 'ERROR',
          message: {
            en: 'Invalid password.',
            fr: `Le mot de passe que vous avez saisi est incorrect !`,
          },
        };
      }
    } else {
      return {
        requestStatus: 'ERROR',
        message: {
          en: 'Account does not exist.',
          fr: `Nous n'avons pas pu trouver de compte associé à cet email.`,
        },
      };
    }
  }
}
