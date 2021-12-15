
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Bike } from '../../bike/entities/bike.entity';
import { Park } from '../../park/entities/park.entity';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;
  
  @Column({ type: 'float'})
  lon: number;

  @Column({ type: 'float'})
  lat: number;

  @ManyToOne(type => Park, park => park.stations)
  park: Park;

  @OneToMany(type => Bike, bike => bike.station, { onDelete: 'CASCADE' })
  bikes: Bike[];
}