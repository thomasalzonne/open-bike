
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Park } from '../../park/entities/park.entity';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;
  
  @Column()
  lon: number;

  @Column()
  lat: number;

  @ManyToOne(type => Park, park => park.id)
  park: Park;
}