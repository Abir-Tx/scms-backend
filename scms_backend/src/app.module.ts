import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogisticsController } from './logistics/logistics.controller';

@Module({
  imports: [],
  controllers: [AppController, LogisticsController],
  providers: [AppService],
})
export class AppModule {}
