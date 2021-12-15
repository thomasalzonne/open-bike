import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Park } from './entities/park.entity';
import { ParkController } from './park.controller';
import { ParkService } from './park.service';

@Module({
    imports: [TypeOrmModule.forFeature([Park]), UserModule],
    controllers: [ParkController],
    providers: [ParkService],
    exports: [ParkService]
})
export class ParkModule {}
