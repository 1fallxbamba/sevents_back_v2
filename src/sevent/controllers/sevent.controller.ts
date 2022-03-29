import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { Sevent } from '../models/sevent.model';
import { SeventService } from '../services/sevent.service';

@Controller('sevents')
export class SeventController {
  constructor(private readonly seventService: SeventService) {}

  @Get()
  async allSevents() {
    const sevents = await this.seventService.returnSevents().catch((error) => {
      throw new HttpException(
        {
          requestStatus: 'ERROR',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    return {
      requestStatus: 'SUCCESS',
      data: sevents,
    };
  }

  @Get(':code')
  async oneSevent(@Param('code') code: string) {
    const sevent = await this.seventService
      .returnSevents(code)
      .catch((error) => {
        throw new HttpException(
          {
            requestStatus: 'ERROR',
            message: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      });

    return {
      requestStatus: 'SUCCESS',
      data: sevent,
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => {
          const randomName = Math.random().toString(36).slice(2);
          cb(null, `${randomName}_${file.originalname}`);
        },
      }),
    }),
  )
  async newSevent(@Body() seventData: Sevent, @UploadedFile() file) {
    seventData.picture = file.filename;
    const response = await this.seventService
      .createSevent(seventData)
      .catch((error) => {
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
        en: 'New sevent successfully created',
        fr: 'Votre evenement a été créé avec succés.',
      },
      data: response,
    };
  }
}
