import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { encryptPassword } from '../../extra/helper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: User) {
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
        fr: `Votre compte a été créé avec succés, vous recevrez un email sur ${userData.email} aprés validation.`,
      },
      data: null,
    };
  }
}
