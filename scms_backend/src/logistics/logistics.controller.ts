import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('logistics')
export class LogisticsController {
	@Get('trucks')
	getTrucks(): string {
		return 'This action returns all cars';
	}

	@Get('trucks/:id')
	getTruckById(@Param('id') id: number): string {
		return 'This action returns a '+id+ ' truck';
	}

	@Get('trucks/:id/drivers')
	getDriversByTruckId(@Param('id') id: number): string {
		return 'This action returns drivers for truck '+id;
	}

	@Get('drivers')
	getDrivers(): string {
		return 'This action returns all drivers';
	}

	@Get('drivers/:id')
	getDriverById(@Param('id') id: number): string {
		return 'This action returns a driver '+id;
	}

	@Get('drivers/:id/trucks')
	getTrucksByDriverId(@Param('id') id: number): string {
		return 'This action returns trucks for driver '+id;
	}

	//Create APIs for the following:

	@Post(trucks)
	createTrucks(@Body() newTruck: Object): Object{
		return newTruck;
	}
}
