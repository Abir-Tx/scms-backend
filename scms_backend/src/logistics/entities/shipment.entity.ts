// shipment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Transport } from './transport.entity'; // Assuming you have a transport entity

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shipmentName: string;

  @Column()
  shippingDate: Date;

  @Column()
  expectedDeliveryDate: Date;

  @Column()
  currentLocation: string;

  @ManyToOne(() => Transport, (transport) => transport.shipments)
  transport: Transport;

  // Add more fields as needed
}
