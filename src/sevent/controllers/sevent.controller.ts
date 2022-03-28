import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Sevent } from '../models/sevent.model';
import { SeventService } from '../services/sevent.service';

@Controller('sevents')
export class SeventController {
  constructor(private readonly seventService: SeventService) {}

  @Post()
  async newSevent(@Body() seventData: Sevent) {
    const response = await this.seventService
      .createSevent(seventData)
      .catch((error) => {
        throw new HttpException(
          {
            status: 'ERROR',
            message: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    return {
      status: 'SUCCESS',
      message: {
        en: 'New sevent successfully created',
        fr: 'Votre evenement a été créé avec succés.',
      },
      data: response,
    };
  }
}
