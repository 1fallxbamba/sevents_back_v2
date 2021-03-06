import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

import { TicketOwner } from './owner.model';

@Entity('tickets')
export class TicketEntity {
  @PrimaryColumn()
  code: string;

  @Column()
  event: string;

  @Column({ type: 'json' })
  owner: TicketOwner;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  bookingDate: Date;
}
