import { StationService } from './station.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ManageStationDto } from '@open-bike/lib';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';

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

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post()
    create(@Body() station: ManageStationDto){
        return this.stationService.createStation(station)
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Patch(':id')
    update(@Param('id') id: number, @Body() station : ManageStationDto) {
      return this.stationService.update(+id, station);
    }  

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.stationService.remove(+id);
    }
}
