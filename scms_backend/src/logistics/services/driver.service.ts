// driver.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async findById(id: number): Promise<Driver> {
    return this.driverRepository.findOne({
      where: { id: id },
    });
  }

  async create(driver: Driver): Promise<Driver> {
    return this.driverRepository.save(driver);
  }

  async remove(id: number): Promise<void> {
    const result = await this.driverRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }
  }

  // Update Driver
  async update(
    id: number,
    updatedDriverData: Partial<Driver>,
  ): Promise<Driver> {
    const existingDriver = await this.driverRepository.findOne({
      where: { id: id },
    });

    if (!existingDriver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }

    // Update only the fields that are provided in updatedDriverData
    if (updatedDriverData.name) {
      existingDriver.name = updatedDriverData.name;
    }
    if (updatedDriverData.contactNumber) {
      existingDriver.contactNumber = updatedDriverData.contactNumber;
    }
    if (updatedDriverData.licenseNumber) {
      existingDriver.licenseNumber = updatedDriverData.licenseNumber;
    }
    if (updatedDriverData.availability !== undefined) {
      existingDriver.availability = updatedDriverData.availability;
    }
    if (updatedDriverData.address) {
      existingDriver.address = updatedDriverData.address;
    }
    if (updatedDriverData.email) {
      existingDriver.email = updatedDriverData.email;
    }
    if (updatedDriverData.vehicleId !== undefined) {
      existingDriver.vehicleId = updatedDriverData.vehicleId;
    }
    if (updatedDriverData.notes) {
      existingDriver.notes = updatedDriverData.notes;
    }
    if (updatedDriverData.photo) {
      existingDriver.photo = updatedDriverData.photo;
    }

    // Save the updated driver
    const updatedDriver = await this.driverRepository.save(existingDriver);

    return updatedDriver;
  }
}
