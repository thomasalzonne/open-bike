
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
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
  
  @Column()
  lon: number;

  @Column()
  lat: number;

  @ManyToOne(type => Park, park => park.id, { onDelete: 'CASCADE' })
  park: Park;

  @OneToMany(type => Bike, bike => bike.id, { onDelete: 'CASCADE' })
  bikes: Bike[];
}