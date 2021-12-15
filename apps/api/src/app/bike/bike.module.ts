import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { BikeController } from './bike.controller';
import { BikeService } from './bike.service';
import { Bike } from './entities/bike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bike]), UserModule],
  controllers: [BikeController],
  providers: [BikeService],
  exports: [BikeService]
})
export class BikeModule {}
