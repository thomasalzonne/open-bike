import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManageBikeDto } from '@open-bike/lib';
import { Repository } from 'typeorm';
import { Bike } from './entities/bike.entity';

@Injectable()
export class BikeService {

    constructor(@InjectRepository(Bike) private bikeRepository: Repository<Bike>) {}
    createBike(bike : ManageBikeDto){
        return this.bikeRepository.insert(bike)
    }
    findAll(){
        return this.bikeRepository.find();
    }
    
    getById(id: number) {
        return this.bikeRepository.findOne(id, { relations:['station'] })
    }

    update(id: number, bike){
        return this.bikeRepository.update(id,bike)
    }

    async remove(id: number): Promise<void> {
        await this.bikeRepository.delete(id);
    }
}
