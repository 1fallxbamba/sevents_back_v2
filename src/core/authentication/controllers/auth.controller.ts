import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { encryptPassword, generateCustomID } from '../../../extra/helper';
import { LoginData } from '../models/login-data.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: User) {
    const existing = await this.authService.findUser(userData.email);

    if (existing) {
      throw new HttpException(
        {
          requestStatus: 'ERROR',
          message: {
            en: 'Account already registered',
            fr: `Un compte avec cet email existe déjà, si c'est le votre veuillez vous connecter.`,
          },
        },
        HttpStatus.CONFLICT,
      );
    } else {
      userData.id = generateCustomID('U');
      userData.password = await encryptPassword(userData.password);
      this.authService.saveUser(userData).catch((error) => {
        throw new HttpException(
          {
            requestStatus: 'ERROR',
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

      return {
        requestStatus: 'SUCCESS',
        message: {
          en: 'New account successfully created',
          fr: `Votre compte a été créé avec succés, vous recevrez un email sur ${userData.email} aprés validation.
          Le délai d'attente moyen est de 1 jour.`,
        },
      };
    }
  }

  @Post('login')
  async login(@Body() loginData: LoginData) {
    return this.authService.authenticateUser(loginData);
  }
}
