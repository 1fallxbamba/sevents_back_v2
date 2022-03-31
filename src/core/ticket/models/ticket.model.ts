import { TicketOwner } from './owner.model';

export interface Ticket {
  code?: string;
  event: string;
  owner: TicketOwner;
  purchaseDate: Date;
}
