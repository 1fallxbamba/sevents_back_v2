import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import {
  encryptPassword,
  verifyPassword,
  generateCustomID,
} from '../../../extra/helper';
import { LoginData } from '../models/login-data.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: User) {
    const existing = await this.authService.findUser(userData.email);

    if (existing) {
      return {
        requestStatus: 'ERROR',
        message: {
          en: 'Account already registered',
          fr: `Un compte avec cet email existe déjà, si c'est le votre veuillez vous connecter.`,
        },
      };
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
    const existing = await this.authService.findUser(loginData.email);
    const passwordsMatch = await verifyPassword(
      loginData.password,
      existing.password,
    );

    if (existing) {
      if (passwordsMatch) {
        if (existing.active) {
          delete existing.password;
          delete existing.active;
          return {
            requestStatus: 'SUCCESS',
            message: 'Login successful',
            data: existing,
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
