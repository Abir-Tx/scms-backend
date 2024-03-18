import { Injectable } from '@nestjs/common';

@Injectable()
export class LogisticsService {
  welcome() {
    return 'Welcome to the Logistics API!';
  }
}
