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
  Query,
} from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { DriverService } from './services/driver.service';
import { Driver } from './entities/driver.entity';
import { TransportService } from './services/transport.service';

@Controller('logistics')
export class LogisticsController {
  constructor(
    private readonly driverService: DriverService,
    private readonly logisticsService: LogisticsService,
    private readonly transportService: TransportService,
  ) {}
  @Get()
  getWelcome() {
    return this.logisticsService.welcome();
  }

  // Drivers
  @Get('drivers')
  getDrivers() {
    const drivers = this.driverService.findAll();

    return drivers;
  }

  @Get('drivers/:id')
  getDriver(@Param('id') id: string) {
    const driver = this.driverService.findById(parseInt(id));

    return driver;
  }

  @Get('drivers/name/:name')
  getDriverByName(
    @Param('name') name: string,
    @Query('isCaseSensitive') isCaseSensitive: string,
  ) {
    let shouldPerformCaseSensitiveSearch: boolean = false;
    if (isCaseSensitive === 'true') {
      shouldPerformCaseSensitiveSearch = true;
    } else {
      shouldPerformCaseSensitiveSearch = false;
    }

    const driver = this.driverService.findByName(
      name,
      shouldPerformCaseSensitiveSearch,
    );

    return driver;
  }

  @Post('drivers')
  async addDriver(@Body() driverData) {
    const newDriver = await this.driverService.create(driverData);
    return newDriver;
  }

  @Delete('drivers/:id')
  async deleteDriver(@Param('id') id: string, @Res() response) {
    try {
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
      return error;
    }
  }

  // Transports
  @Get('transports')
  getTransports() {
    return this.transportService.getAllTransports();
  }

  @Post('transports')
  async addTransport(@Body() transportData) {
    const newTransport =
      await this.transportService.createTransport(transportData);
    return newTransport;
  }

  // Get a transport by ID
  @Get('transports/:id')
  getTransportById(@Param('id') id: string) {
    return this.transportService.getTransportById(parseInt(id));
  }
}
