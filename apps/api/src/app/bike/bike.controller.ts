import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ManageBikeDto } from '@open-bike/lib';
import { BikeService } from './bike.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './../auth/admin.guard';

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

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post()
    create(@Body() bike: ManageBikeDto){
        return this.bikeService.createBike(bike)
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Patch(':id')
    update(@Param('id') id: number, @Body() bike : ManageBikeDto) {
      return this.bikeService.update(+id, bike);
    }  

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bikeService.remove(+id);
    }
}
