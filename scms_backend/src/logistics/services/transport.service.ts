import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transport } from '../entities/transport.entity';

@Injectable()
export class TransportService {
  constructor(
    @InjectRepository(Transport)
    private transportRepository: Repository<Transport>,
  ) {}

  async createTransport(transportData: Partial<Transport>): Promise<Transport> {
    try {
      const transport = await this.transportRepository.save(transportData);
      return transport;
    } catch (error) {
      throw new HttpException(
        'Failed to create transport',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllTransports(): Promise<Transport[]> {
    const transports = await this.transportRepository.find();
    return transports;
  }

  async getTransportById(id: number): Promise<Transport> {
    const transport = await this.transportRepository.findOne({
      where: { id: id },
    });
    if (!transport) {
      throw new HttpException('Transport not found', HttpStatus.NOT_FOUND);
    }
    return transport;
  }

  async updateTransport(
    id: number,
    updatedTransportData: Partial<Transport>,
  ): Promise<Transport> {
    const existingTransport = await this.transportRepository.findOne({
      where: { id: id },
    });

    if (!existingTransport) {
      throw new HttpException('Transport not found', HttpStatus.NOT_FOUND);
    }

    // Update only the fields that are provided in updatedTransportData
    if (updatedTransportData.source) {
      existingTransport.source = updatedTransportData.source;
    }
    if (updatedTransportData.destination) {
      existingTransport.destination = updatedTransportData.destination;
    }
    if (updatedTransportData.status) {
      existingTransport.status = updatedTransportData.status;
    }

    if (updatedTransportData.driver) {
      existingTransport.driver = updatedTransportData.driver;
    }

    const updatedTransport =
      await this.transportRepository.save(existingTransport);
    return updatedTransport;
  }

  async deleteTransport(id: number): Promise<void> {
    const result = await this.transportRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Transport not found', HttpStatus.NOT_FOUND);
    }
  }
}
