import { Controller, Get } from '@nestjs/common';

@Controller('logistics')
export class LogisticsController {
	@Get()
	testHello(): string {
		return 'Hello from LogisticsController';
	}
}
