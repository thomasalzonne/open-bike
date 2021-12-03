
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Station } from '../../station/entities/station.entity';

@Entity()
export class Park {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Station, station => station.id)
  stations: Station[];
}