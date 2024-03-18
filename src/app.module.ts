import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogisticsModule } from './logistics/logistics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './logistics/entities/driver.entity';
import { Transport } from './logistics/entities/transport.entity';
import { Shipment } from './logistics/entities/shipment.entity';
require('dotenv').config();

@Module({
  imports: [
    LogisticsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT) || 5432,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [Transport, Driver, Shipment],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
