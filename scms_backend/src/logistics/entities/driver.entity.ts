// driver.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transport } from './transport.entity'; // Assuming you have a transport entity

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactNumber: string;

  @Column()
  licenseNumber: string;

  @Column()
  availability: boolean;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  vehicleId: number; // If drivers are assigned specific vehicles

  @Column()
  notes: string;

  @Column()
  photo: string; // a reference to the driver's photo

  @OneToMany(() => Transport, (transport) => transport.driver)
  transports: Transport[];
}
