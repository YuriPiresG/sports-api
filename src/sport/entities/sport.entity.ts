import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  rules?: string;
}
