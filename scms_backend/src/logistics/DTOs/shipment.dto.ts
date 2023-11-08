import { Transform } from 'class-transformer';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateShipmentDto {
  @IsString({ message: 'Status should be a string' })
  status: string;

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Shipment date should be a valid date' })
  shipmentDate: Date;

  @IsString({ message: 'Description should be a string' })
  description: string;

  @IsNumber({}, { message: 'Weight should be a number' })
  weight: number;

  @IsString({ message: 'Destination should be a string' })
  destination: string;

  @IsString({ message: 'Special instructions should be a string' })
  specialInstructions: string;

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Estimated arrival date should be a valid date' })
  estimatedArrivalDate: Date;

  @IsNumber()
  driverId: number;

  @IsNumber()
  transportId: number;
}
