import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Station } from './entities/station.entity';
import { StationController } from './station.controller';
import { StationService } from './station.service';

@Module({
    imports: [TypeOrmModule.forFeature([Station]), UserModule],
    controllers: [StationController],
    providers: [StationService],
    exports: [StationService]
})
export class StationModule {}
