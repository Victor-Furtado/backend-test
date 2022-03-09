import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  owner: string;

  @Column()
  initial_amount: number;

  @Column({ nullable: true })
  withdraw_amount: number;

  @Column({ nullable: true })
  withdraw_date: Date;

  @Column()
  creation_date: Date;
}
