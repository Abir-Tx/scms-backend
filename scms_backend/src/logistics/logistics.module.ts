import { Module } from '@nestjs/common';
import { LogisticsController } from './logistics.controller';
import { LogisticsService } from './logistics.service';
import { DriverService } from './services/driver.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Driver } from './entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  controllers: [LogisticsController],
  providers: [LogisticsService, DriverService],
})
export class LogisticsModule {}
