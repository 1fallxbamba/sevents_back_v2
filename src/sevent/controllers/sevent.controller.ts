import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { Sevent } from '../models/sevent.model';
import { SeventService } from '../services/sevent.service';

@Controller('sevents')
export class SeventController {
  constructor(private readonly seventService: SeventService) {}

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
