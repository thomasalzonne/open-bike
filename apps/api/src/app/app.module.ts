import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

require('dotenv').config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NX_DATABASE_HOST,
      port: +process.env.NX_DATABASE_PORT || 3306,
      username: process.env.NX_DATABASE_USER,
      password: process.env.NX_DATABASE_PASS,
      database: process.env.NX_DATABASE_NAME,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
