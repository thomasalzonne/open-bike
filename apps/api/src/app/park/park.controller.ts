import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ManageParkDto } from '@open-bike/lib';
import { ParkService } from './park.service';

@Controller('park')
export class ParkController {
    constructor(private parkService: ParkService){}

    @Get(':id')
    getById(@Param('id') id: number){
        return this.parkService.getById(id)
    }

    @Get()
    async findAll(){
        return await this.parkService.findAll()
    }

    @Post()
    create(@Body() park: ManageParkDto){
        return this.parkService.createPark(park)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() park : ManageParkDto) {
      return this.parkService.update(+id, park);
    }  

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.parkService.remove(+id);
    }
}
