import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Station } from '../../station/entities/station.entity';

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Station, station => station.id)
  stations: Station;
}