// Logistics Manager controller
import { Controller, Get, Post, Body } from '@nestjs/common';
import { LogisticsService } from './logistics.service';

@Controller('logistics')
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}
  // GET Transports
  @Post()
  createTransportRequest(@Body() requestData) {
    return this.logisticsService.createTransportRequest(requestData);
  }

  @Get()
  getAvailableTransportOptions() {
    return this.logisticsService.getAvailableTransportOptions();
  }
}
