import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { Ticket } from '../models/ticket.model';
import { TicketService } from '../services/ticket.service';
import { generateCustomID } from '../../../extra/helper';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async bookATicket(@Body() ticketData: Ticket) {
    ticketData.code = generateCustomID('T');
    const response = await this.ticketService
      .saveTicket(ticketData)
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
        en: 'New booking successfully placed',
        fr: `Votre réservation a été placée avec succés, vous recevrez votre ticket sur le ${ticketData.owner.phone}.`,
      },
      data: response,
    };
  }

  @Get('of/owner/:phone')
  async allOwnerTickets(@Param('phone') ownerPhone: string) {
    const tickets = await this.ticketService
      .findOwnerTickets(ownerPhone)
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
      data: tickets,
    };
  }

  @Get('of/event/:code')
  async allEventTickets(@Param('code') eventCode: string) {
    const tickets = await this.ticketService
      .findEventTickets(eventCode)
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
      data: tickets,
    };
  }
}
