import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Station } from '../../station/entities/station.entity';

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Station, station => station.id)
  station: Station;
}