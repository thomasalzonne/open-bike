import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Park } from './entities/park.entity';
import { ManageParkDto } from '@open-bike/lib';

@Injectable()
export class ParkService {

    constructor(@InjectRepository(Park) private parkRepository: Repository<Park>) {

    }
    private park : ManageParkDto[] = [
        {
            id: 1,
            name : 'Parc de la Roseraie',
            city: 'Toulouse',
            bikes : [
                {
                  id : 0,
                  stationId : 1
                },
                {
                  id : 1,
                  stationId : 1
                },
                {
                  id : 2,
                  stationId : 1
                }
            ]
        },
        {
            id: 2,
            name : 'Parc de la pizza',
            city: 'Toulouse',
            bikes : [
                {
                  id : 12,
                  stationId : 0
                }
            ]
        },
        {
            id: 3,
            name : 'Parc de la boule de neige',
            city: 'Paris',
            bikes : [
                {
                  id : 154,
                  stationId : 3
                },
                {
                  id : 123,
                  stationId : 3
                },
                {
                  id : 148,
                  stationId : 3
                }
            ]
        }
    ]
    createPark(park : ManageParkDto){
        return this.parkRepository.insert(park)
    }
    findAll(){
        // return this.parkRepository.find();
        return this.park;
    }
    
    getById(id: number) {
        return this.parkRepository.findOne(id);
    }

    update(id: number, park){
        return this.parkRepository.update(id,park)
    }

    async remove(id: number): Promise<void> {
        await this.parkRepository.delete(id);
    }
}
