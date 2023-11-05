import { Module } from '@nestjs/common';
import { LogisticsController } from './controllers/logistics.controller';
import { LogisticsService } from './services/logistics.service';
import { DriverService } from './services/driver.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Driver } from './entities/driver.entity';
import { TransportService } from './services/transport.service';
import { Transport } from './entities/transport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Transport])],
  controllers: [LogisticsController],
  providers: [LogisticsService, DriverService, TransportService],
})
export class LogisticsModule {}
