import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { LocationModule } from '../location/location.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ParkModule } from './park/park.module';
import { BikeModule } from './bike/bike.module';
import { StationModule } from './station/station.module';
import { Park } from './park/entities/park.entity';
import { Station } from './station/entities/station.entity';
import { Bike } from './bike/entities/bike.entity';

require('dotenv').config();
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NX_DATABASE_HOST,
      port: +process.env.NX_DATABASE_PORT || 3306,
      username: process.env.NX_DATABASE_USER,
      password: process.env.NX_DATABASE_PASS,
      database: process.env.NX_DATABASE_NAME,
      entities: [User, Park, Station, Bike],
      synchronize: true,
    }),
    UserModule, AuthModule, LocationModule, ParkModule, BikeModule, StationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
