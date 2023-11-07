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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LogisticsService } from '../services/logistics.service';
import { DriverService } from '../services/driver.service';
import { Driver } from '../entities/driver.entity';
import { TransportService } from '../services/transport.service';
import { Transport } from '../entities/transport.entity';
import { CreateDriverDto } from '../DTOs/driver.dto';
import { ShipmentService } from '../services/shipment.service';

@Controller('logistics')
export class LogisticsController {
  constructor(
    private readonly driverService: DriverService,
    private readonly logisticsService: LogisticsService,
    private readonly transportService: TransportService,
    private readonly sv: ShipmentService,
  ) {}
  @Get()
  getWelcome() {
    return this.logisticsService.welcome();
  }

  // -------------------------- Drivers --------------------------
  /**
   * This file implements the following API routes for drivers:
   *
   * GET /drivers/:id - Retrieves a driver by its ID
   * GET /drivers/name/:name - Retrieves a driver by its name, with an optional case sensitivity flag
   * POST /drivers - Adds a new driver
   * DELETE /drivers/:id - Deletes a driver by its ID
   * PUT /drivers/:id - Updates a driver by its ID
   * GET /drivers/:id/transports - Retrieves all transports assigned to a driver by the driver's ID
   */

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
  @UsePipes(new ValidationPipe())
  async addDriver(@Body() driverDto: CreateDriverDto) {
    const newDriver = await this.driverService.create(driverDto);
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

  @Get('drivers/:id/transports')
  getTransportsForDriver(@Param('id') id: string) {
    return this.driverService.getAssignedTransports(parseInt(id));
  }

  // An API route to assign a transport to a driver
  @Post('drivers/:driverId/transports/:transportId')
  assignTransportToDriver(
    @Param('driverId') driverId: string,
    @Param('transportId') transportId: string,
  ) {
    return this.driverService.assignTransport(
      parseInt(driverId),
      parseInt(transportId),
    );
  }

  // An API route to unassign a transport from a driver
  @Delete('drivers/:driverId/transports/:transportId')
  unassignTransportFromDriver(
    @Param('driverId') driverId: string,
    @Param('transportId') transportId: string,
  ) {
    return this.driverService.unassignTransport(
      parseInt(driverId),
      parseInt(transportId),
    );
  }

  // ---------------------------- Transports -----------------------------
  /**
   * This file implements the following API routes:
   *
   * GET /transports/:id - Retrieves a transport by its ID
   * PUT /transports/:id - Updates a transport by its ID
   * DELETE /transports/:id - Deletes a transport by its ID
   */

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

  // Update a transport details
  @Put('transports/:id')
  updateTransport(
    @Param('id') id: string,
    @Body() updatedTransportData: Partial<Transport>,
  ) {
    return this.transportService.updateTransport(
      parseInt(id),
      updatedTransportData,
    );
  }

  // Delete a transport
  @Delete('transports/:id')
  deleteTransport(@Param('id') id: string, @Res() response) {
    try {
      this.transportService.deleteTransport(parseInt(id));
      response.status(200).json({ message: 'Transport successfully deleted' });
    } catch (error) {
      response
        .status(500)
        .json({ message: error.message || 'Something went wrong' });
    }
  }

  // ---------------------------- Shipments -----------------------------

  // Get All Shipments
  @Get('shipments')
  getAllShipments() {
    return this.sv.findAllShipments();
  }
}
