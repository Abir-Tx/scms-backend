// shipment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Transport } from './transport.entity';
import { Driver } from './driver.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ type: 'date' })
  shipmentDate: Date;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  destination: string;

  @Column()
  specialInstructions: string;

  @Column({ type: 'date' })
  estimatedArrivalDate: Date;

  @ManyToOne(() => Driver, (driver) => driver.transports)
  driver: Driver;

  @ManyToOne(() => Transport, (transport) => transport.shipments)
  transport: Transport;
}
