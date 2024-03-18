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
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LogisticsService } from '../services/logistics.service';
import { DriverService } from '../services/driver.service';
import { TransportService } from '../services/transport.service';
import { Transport } from '../entities/transport.entity';
import { CreateDriverDto, DriverLoginDto } from '../DTOs/driver.dto';
import { ShipmentService } from '../services/shipment.service';
import { CreateShipmentDto } from '../DTOs/shipment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { SessionGuard } from '../guards/driver.guards';

@Controller('logistics')
export class LogisticsController {
  constructor(
    private readonly driverService: DriverService,
    private readonly logisticsService: LogisticsService,
    private readonly transportService: TransportService,
    private readonly shipmentService: ShipmentService,
  ) {}
  @Get()
  getWelcome() {
    return this.logisticsService.welcome();
  }

  // -------------------------- Drivers --------------------------
  /**
   * This file implements the following API routes for drivers:
   *
   * GET /drivers - Retrieves all drivers
   * GET /drivers/:id - Retrieves a driver by its ID
   * GET /drivers/name/:name - Retrieves a driver by its name
   * GET /drivers/email/:email - Retrieves a driver by its email
   * POST /drivers - Creates a new driver
   * PUT /drivers/:id - Updates a driver by its ID
   * DELETE /drivers/:id - Deletes a driver by its ID
   * GET /drivers/:id/transports - Retrieves all transports for a driver
   * POST /drivers/:driverId/transports/:transportId - Assigns a transport to a driver
   * DELETE /drivers/:driverId/transports/:transportId - Unassigns a transport from a driver
   * GET /drivers/:id/shipments - Retrieves all shipments for a driver
   * POST /drivers/:id/upload-propic - Uploads a profile picture for a driver
   * POST /drivers/login - Login for drivers
   * POST /drivers/logout - Logout for drivers
   *
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

  @Get('drivers/email/:email')
  getDriverByEmail(@Param('email') email: string) {
    const driver = this.driverService.findByEmail(email);

    return driver;
  }

  @Post('drivers')
  // @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async addDriver(@Body() driverDto: CreateDriverDto) {
    const newDriver = await this.driverService.create(driverDto);
    return newDriver;
  }

  @Delete('drivers/:id')
  //  @UseGuards(SessionGuard)
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
  //  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateDriver(
    @Param('id') id: string,
    @Body() updatedDriverData: CreateDriverDto,
  ) {
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
  @UseGuards(SessionGuard)
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
  @UseGuards(SessionGuard)
  unassignTransportFromDriver(
    @Param('driverId') driverId: string,
    @Param('transportId') transportId: string,
  ) {
    return this.driverService.unassignTransport(
      parseInt(driverId),
      parseInt(transportId),
    );
  }

  // Get all shipments for a driver
  @Get('drivers/:id/shipments')
  @UseGuards(SessionGuard)
  getShipmentsForDriver(@Param('id') id: string) {
    return this.shipmentService.getShipmentsForDriver(parseInt(id));
  }

  // Upload a profile picture for a driver
  @Post('drivers/:id/upload-propic')
  @UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype.match(/\/(jpg|jpeg|png|gif)$/i) &&
          file.fieldname === 'photo'
        ) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'), false);
        }
      },
      limits: { fileSize: 5000000 }, // 5MB
      storage: diskStorage({
        destination: (req, file, cb) => {
          const driverId = req.params.id;
          const uploadPath = `uploads/logistics/drivers/${driverId}`;

          // Check if the directory exists, if not, create it
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadPhoto(@Param('id') id: number, @UploadedFile() photo) {
    const driver = await this.driverService.findById(id);
    if (!driver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }

    driver.photo = photo.path;
    await this.driverService.update(id, driver);

    return { message: `Photo uploaded successfully for driver with id ${id}` };
  }

  // Login
  @Post('drivers/login')
  async login(
    @Body() driverLoginDto: DriverLoginDto,
    @Session() driverSession,
  ) {
    const driver = await this.driverService.findByEmail(driverLoginDto.email);

    if (!driver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    } else {
      const result = await this.driverService.login(driverLoginDto);

      if (result) {
        driverSession.email = driverLoginDto.email;
        return {
          message: 'Login successful. Your session has been saved',
          driverId: driver.id,
        };
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    }
  }

  // Logout
  @Post('drivers/logout')
  logout(@Session() driverSession) {
    if (driverSession.email) {
      driverSession.email = null;
      return { message: 'Logout successful' };
    } else {
      throw new HttpException('You are not logged in', HttpStatus.UNAUTHORIZED);
    }
  }

  // ---------------------------- Transports -----------------------------
  /**
   * This file implements the following API routes:
   *
   * GET /transports/:id - Retrieves a transport by its ID
   * PUT /transports/:id - Updates a transport by its ID
   * DELETE /transports/:id - Deletes a transport by its ID
   * GET /transports/:id/shipments - Retrieves all shipments for a transport
   *
   */

  @Get('transports')
  // @UseGuards(SessionGuard)
  getTransports() {
    return this.transportService.getAllTransports();
  }

  @Post('transports')
  //  @UseGuards(SessionGuard)
  async addTransport(@Body() transportData) {
    const newTransport =
      await this.transportService.createTransport(transportData);
    return newTransport;
  }

  // Get a transport by ID
  @Get('transports/:id')
  @UseGuards(SessionGuard)
  getTransportById(@Param('id') id: string) {
    return this.transportService.getTransportById(parseInt(id));
  }

  // Update a transport details
  @Put('transports/:id')
  @UseGuards(SessionGuard)
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
  @UseGuards(SessionGuard)
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

  // Get all shipments for a transport
  @Get('transports/:id/shipments')
  @UseGuards(SessionGuard)
  getShipmentsForTransport(@Param('id') id: string) {
    return this.shipmentService.getShipmentsForTransport(parseInt(id));
  }

  // ---------------------------- Shipments -----------------------------

  /**
   * This file implements the following API routes:
   *
   * GET /shipments - Retrieves all shipments
   * GET /shipments/:id - Retrieves a shipment by its ID
   * POST /shipments - Creates a new shipment
   * PUT /shipments/:id - Updates a shipment by its ID
   * DELETE /shipments/:id - Deletes a shipment by its ID
   * GET /shipments/:id/driver - Retrieves the driver for a shipment
   * GET /shipments/:id/transport - Retrieves the transport for a shipment
   *
   */

  // Get All Shipments
  @Get('shipments')
  // @UseGuards(SessionGuard)
  getAllShipments() {
    return this.shipmentService.findAllShipments();
  }

  @Get('shipments/:id')
  @UseGuards(SessionGuard)
  getShipmentById(@Param('id') id: string) {
    return this.shipmentService.findShipmentById(parseInt(id));
  }

  @Post('shipments')
  //  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async addShipment(@Body() shipmentData) {
    const newShipment = await this.shipmentService.createShipment(shipmentData);
    return newShipment;
  }

  @Put('shipments/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateShipment(
    @Param('id') id: string,
    @Body() updatedShipmentData: CreateShipmentDto,
  ) {
    return this.shipmentService.updateShipment(
      parseInt(id),
      updatedShipmentData,
    );
  }

  @Delete('shipments/:id')
  // @UseGuards(SessionGuard)
  deleteShipment(@Param('id') id: string, @Res() response) {
    try {
      this.shipmentService.deleteShipment(parseInt(id));
      response.status(200).json({ message: 'Shipment successfully deleted' });
    } catch (error) {
      response
        .status(500)
        .json({ message: error.message || 'Something went wrong' });
    }
  }

  // Get driver details for shipment
  @Get('shipments/:id/driver')
  @UseGuards(SessionGuard)
  getDriverForShipment(@Param('id') id: string) {
    return this.shipmentService.getDriverForShipment(parseInt(id));
  }

  // Get transport details for shipmen
  @Get('shipments/:id/transport')
  @UseGuards(SessionGuard)
  getTransportForShipment(@Param('id') id: string) {
    return this.shipmentService.getTransportForShipment(parseInt(id));
  }
}
