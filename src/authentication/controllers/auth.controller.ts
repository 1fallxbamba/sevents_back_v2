import { Body, Controller, Post } from '@nestjs/common';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: User) {
    return this.authService.saveUser(userData);
  }
}
