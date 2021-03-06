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
  Put,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { unlink } from 'fs';

import { Sevent } from '../models/sevent.model';
import { SeventService } from '../services/sevent.service';
import { fileUploadOptions, generateCustomID } from '../../../extra/helper';
import { JwtAuthGuard } from '../../authentication/security/local.guard';

@Controller('sevents')
export class SeventController {
  constructor(private readonly seventService: SeventService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture', fileUploadOptions))
  async createSevent(@Body() seventData: Sevent, @UploadedFile() file) {
    seventData.code = generateCustomID('S');
    seventData.picture = file.filename;
    const response = await this.seventService
      .saveSevent(seventData)
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

  @Get()
  async allSevents() {
    const sevents = await this.seventService.findAllSevents().catch((error) => {
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

  @UseGuards(JwtAuthGuard)
  @Get('of/:id')
  async allSeventsOfUser(@Param('id') userID: string) {
    const sevents = await this.seventService
      .findSeventsOfUser(userID)
      .catch((error) => {
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
    const sevent = await this.seventService.findSevent(code).catch((error) => {
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

  @UseGuards(JwtAuthGuard)
  @Put(':code')
  @UseInterceptors(FileInterceptor('picture', fileUploadOptions))
  async editSevent(
    @Body() seventData: Sevent,
    @UploadedFile() file,
    @Param('code') code: string,
  ) {
    const existingSevent = await this.seventService.findSevent(code);

    if (file) {
      seventData.picture = file.filename;
      unlink(`./public/images/${existingSevent.picture}`, (error) => {
        if (error) {
          throw new HttpException(
            {
              requestStatus: 'ERROR',
              message: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
    }

    const response = await this.seventService
      .updateSevent(code, seventData)
      .catch((error) => {
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
      message: {
        en: 'Event successfully updated',
        fr: 'Votre evenement a été mis à jour avec succés.',
      },
      data: response,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':code')
  async archiveSevent(@Param('code') code: string) {
    const existingSevent = await this.seventService.findSevent(code);
    existingSevent.archived = true;

    const response = await this.seventService
      .saveSevent(existingSevent)
      .catch((error) => {
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
      message: {
        en: 'Event successfully archived',
        fr: 'Votre evenement a été archivé avec succés.',
      },
      data: response,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':code')
  async removeSevent(@Param('code') code: string) {
    const existingSevent = await this.seventService.findSevent(code);

    unlink(`./public/images/${existingSevent.picture}`, (error) => {
      if (error) {
        throw new HttpException(
          {
            requestStatus: 'ERROR',
            message: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });

    const response = await this.seventService
      .deleteSevent(code)
      .catch((error) => {
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
      message: {
        en: 'Event successfully deleted',
        fr: 'Votre evenement a été supprimé avec succés.',
      },
      data: response,
    };
  }
}
