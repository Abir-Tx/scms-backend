// Logistics Manager controller
import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common';
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

  @Post('drivers')
  async addDriver(@Body() driverData) {
    // Call the DriverService method to create a new driver
    const newDriver = await this.driverService.create(driverData); // Assuming you have a create method in your DriverService
    return newDriver;
  }

  @Delete('drivers/:id')
  async deleteDriver(@Param('id') id: string, @Res() response) {
    try {
      // Call the DriverService method to delete the driver
      await this.driverService.remove(parseInt(id));
      response.status(200).json({ message: 'Driver successfully deleted' });
    } catch (error) {
      response
        .status(500)
        .json({ message: error.message || 'Something went wrong' });
    }
  }
}
