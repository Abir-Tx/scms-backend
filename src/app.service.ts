import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to SCMS API Created By Mushfiqur Rahman Abir. Get the API documentation at https://documenter.getpostman.com/view/21420955/2s9YXk3gYw';
  }
}
