import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  status: string;

  @IsDate()
  shipmentDate: Date;

  @IsString()
  description: string;

  @IsNumber()
  weight: number;

  @IsString()
  destination: string;

  @IsString()
  specialInstructions: string;

  @IsDate()
  estimatedArrivalDate: Date;

  @IsNumber()
  driverId: number; // ID of the assigned driver

  @IsNumber()
  transportId: number; // ID of the associated transport
}
