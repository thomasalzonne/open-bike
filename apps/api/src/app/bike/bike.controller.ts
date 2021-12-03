import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ManageBikeDto } from '@open-bike/lib';
import { BikeService } from './bike.service';

@Controller('bike')
export class BikeController {
    constructor(private bikeService: BikeService){}

    @Get(':id')
    getById(@Param('id') id: number){
        return this.bikeService.getById(id)
    }

    @Get()
    async findAll(){
        return await this.bikeService.findAll()
    }

    @Post()
    create(@Body() bike: ManageBikeDto){
        return this.bikeService.createBike(bike)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() bike : ManageBikeDto) {
      return this.bikeService.update(+id, bike);
    }  

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bikeService.remove(+id);
    }
}
