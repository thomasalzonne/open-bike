import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManageStationDto } from '@open-bike/lib';
import { Repository } from 'typeorm';
import { Station } from './entities/station.entity';

@Injectable()
export class StationService {
    constructor(@InjectRepository(Station) private stationRepository: Repository<Station>) {

    }
    createStation(station : ManageStationDto){
        return this.stationRepository.insert(station)
    }
    findAll(){
        return this.stationRepository.find();
    }
    
    getById(id: number) {
        return this.stationRepository.findOne(id, { relations: ['park']});
    }

    update(id: number, station){
        return this.stationRepository.update(id,station)
    }

    async remove(id: number): Promise<void> {
        await this.stationRepository.delete(id);
    }
}
