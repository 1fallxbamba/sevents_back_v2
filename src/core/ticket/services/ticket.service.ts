import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { TicketEntity } from '../models/ticket.entity';
import { Ticket } from '../models/ticket.model';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  saveTicket(ticket: Ticket) {
    return this.ticketRepository.save(ticket);
  }
}
