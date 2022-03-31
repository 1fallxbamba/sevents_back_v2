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

  findOwnerTickets(phone: string) {
    const query = `SELECT tk.code as code, tk."bookingDate", tk.owner->>'quantity' as places,
      sv.title as event, sv.starting, sv.ending, sv.price
      from public.tickets tk, public.sevents sv
       where tk.owner->>'phone'='${phone}'
       and tk.event = sv.code;`;
    return this.ticketRepository.query(query);
  }

  findEventTickets(code: string) {
    return this.ticketRepository.findBy({ event: code });
  }
}
