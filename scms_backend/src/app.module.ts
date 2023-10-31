import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogisticsModule } from './logistics/logistics.module';

@Module({
  imports: [LogisticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
