import { StationService } from './station.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ManageStationDto } from '@open-bike/lib';

@Controller('station')
export class StationController {

    constructor(private stationService: StationService){}

    @Get(':id')
    getById(@Param('id') id: number){
        return this.stationService.getById(id)
    }

    @Get()
    async findAll(){
        return await this.stationService.findAll()
    }

    @Post()
    create(@Body() station: ManageStationDto){
        return this.stationService.createStation(station)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() station : ManageStationDto) {
      return this.stationService.update(+id, station);
    }  

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.stationService.remove(+id);
    }
}
