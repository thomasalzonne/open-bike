import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { LocationModule } from '../location/location.module';

require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NX_DATABASE_HOST,
      port: +process.env.NX_DATABASE_PORT || 3306,
      username: process.env.NX_DATABASE_USER,
      password: process.env.NX_DATABASE_PASS,
      database: process.env.NX_DATABASE_NAME,
      entities: [User],
      synchronize: true,
    }),
    UserModule, AuthModule, LocationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
