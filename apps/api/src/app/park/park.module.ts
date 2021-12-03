import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Park } from './entities/park.entity';
import { ParkController } from './park.controller';
import { ParkService } from './park.service';

@Module({
    imports: [TypeOrmModule.forFeature([Park])],
    controllers: [ParkController],
    providers: [ParkService],
    exports: [ParkService]
})
export class ParkModule {}
