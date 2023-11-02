import { Injectable } from '@nestjs/common';

@Injectable()
export class LogisticsService {
  welcome() {
    // Logic to retrieve the list of available transportation options
    return 'Hello LM';
  }
}
