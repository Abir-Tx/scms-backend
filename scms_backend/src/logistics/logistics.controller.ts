// Logistics Manager controller
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
} from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { DriverService } from './services/driver.service';
import { Driver } from './entities/driver.entity';

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

  @Get('drivers/:id')
  getDriver(@Param('id') id: string) {
    const driver = this.driverService.findById(parseInt(id)); // Assuming you have a findById method

    return driver;
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

  @Put('drivers/:id')
  updateDriver(@Param('id') id: string, @Body() updatedDriverData: Driver) {
    try {
      const updatedDriver = this.driverService.update(
        parseInt(id),
        updatedDriverData,
      );
      return updatedDriver;
    } catch (error) {
      return error; // You can return the error response here
    }
  }
}
