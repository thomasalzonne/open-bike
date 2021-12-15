import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ManageParkDto } from '@open-bike/lib';
import { AdminGuard } from '../auth/admin.guard';
import { ParkService } from './park.service';

@Controller('park')
export class ParkController {
    constructor(private parkService: ParkService){}

    @Get(':id')
    getById(@Param('id') id: number){
        return this.parkService.getById(id)
    }

    @Get()
    findAll(){
        return this.parkService.findAll()
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post()
    create(@Body() park: ManageParkDto){
        return this.parkService.createPark(park)
    }

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Patch(':id')
    update(@Param('id') id: number, @Body() park : ManageParkDto) {
      return this.parkService.update(+id, park);
    }  
    
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.parkService.remove(+id);
    }
}
