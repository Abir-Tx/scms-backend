import { Body, Injectable } from '@nestjs/common';
import { ProducerInfo } from './producer.dto';

@Injectable()
export class AdminService {
  getHello(): string {
    return 'Show All Product Producers!';
  }
  addProducer(producerInfo: ProducerInfo): object {
    return {
      id: producerInfo.id,
      name: producerInfo.name,
      email: producerInfo.email,
    };
  }
  searchProducer(name: string, id: number): object {
    return { userid: id, nusername: name };
  }
  updateProducer(id): string {
    return `User id ${id} updated`;
  }
  deleteProducer(id): string {
    return `User id ${id} Deleted`;
  }
}
