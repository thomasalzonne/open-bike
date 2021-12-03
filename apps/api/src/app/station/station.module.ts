import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { StationController } from './station.controller';
import { StationService } from './station.service';

@Module({
    imports: [TypeOrmModule.forFeature([Station])],
    controllers: [StationController],
    providers: [StationService],
    exports: [StationService]
})
export class StationModule {}
