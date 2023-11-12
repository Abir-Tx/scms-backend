// transport.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Driver } from './driver.entity'; // Assuming you have a driver entity
import { Shipment } from './shipment.entity';

@Entity()
export class Transport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  destination: string;

  @Column({ type: 'date' })
  requestedDate: Date;

  @Column()
  status: string;

  @ManyToOne(() => Driver, (driver) => driver.transports)
  driver: Driver;

  @OneToMany(() => Shipment, (shipment) => shipment.transport)
  shipments: Shipment[];
}
