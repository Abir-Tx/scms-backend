import { Controller, Get, Post, Body, Query, Put, Delete, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ProducerInfo } from './producer.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('producer')
  getHello(): string {
    return this.adminService.getHello();
  }
  @Post('producer')
  addProducer(@Body() producerInfo: ProducerInfo): object{
    return this.adminService.addProducer(producerInfo)
  }
  @Get('searchproducer')
  searchProducer(@Query('name') name:string, @Query('id') id:number):string{
    return this.adminService.searchProducer(name, id);
  }
  @Put('producer/:id')
  updateProducer(@Param('id') id:number):string{
    return this.adminService.updateProducer(id);
  }
  @Delete('producer/:id')
  deleteProducer(@Param('id') id:number):string{
    return this.adminService.deleteProducer(id);
  }
//   @Delete('')
}
