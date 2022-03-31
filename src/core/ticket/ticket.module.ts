import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketService } from './services/ticket.service';
import { TicketController } from './controllers/ticket.controller';
import { TicketEntity } from './models/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
