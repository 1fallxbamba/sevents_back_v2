import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('sevents')
export class SeventEntity {
  @PrimaryColumn()
  code: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  price: number;

  @Column()
  places: number;

  @Column()
  starting: Date;

  @Column()
  ending: Date;

  @Column()
  picture: string;

  @Column()
  archived: boolean;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
