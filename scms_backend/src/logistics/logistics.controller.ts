// Logistics Manager controller
import { Controller, Get, Post, Body } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { DriverService } from './services/driver.service';

@Controller('logistics')
export class LogisticsController {
  constructor(
    private readonly driverService: DriverService,
    private readonly logisticsService: LogisticsService,
  ) {}
  // GET Transports
  @Post()
  createTransportRequest(@Body() requestData) {
    return this.logisticsService.createTransportRequest(requestData);
  }

  @Get()
  getAvailableTransportOptions() {
    return this.logisticsService.getAvailableTransportOptions();
  }

  // Drivers
  @Get('drivers')
  getDrivers() {
    // Call the DriverService method to get a list of drivers
    const drivers = this.driverService.findAll(); // Assuming you have a findAll method

    return drivers;
  }
}
