import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SeventEntity {
  @PrimaryGeneratedColumn()
  code: number;

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

  @Column({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
