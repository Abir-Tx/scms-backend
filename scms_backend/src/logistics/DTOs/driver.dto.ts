import {
  IsString,
  IsEmail,
  IsNumber,
  IsBoolean,
  Matches,
} from 'class-validator';

// Custom Validators (Decorators)
import { IsLicenseNumberFormat } from './custom_decorators/lisenceNumberFormat.decorator';
import { IsBangladeshPhoneNumber } from './custom_decorators/bdContactNumber.decorator';

export class CreateDriverDto {
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsString({ message: 'Contact number should be a string' })
  @IsBangladeshPhoneNumber()
  contactNumber: string;

  @IsString({ message: 'License number should be a string' })
  @IsLicenseNumberFormat()
  licenseNumber: string;

  @IsBoolean({ message: 'Availability should be a boolean' })
  availability: boolean;

  @IsString({ message: 'Address should be a string' })
  address: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNumber({}, { message: 'Vehicle ID should be a number' })
  vehicleId: number;

  @IsString({ message: 'Notes should be a string' })
  notes: string;

  @Matches(/\.(jpg|png|JPG|PNG)$/, {
    message: 'Photo should have .jpg or .png extension',
  })
  photo: string;
}
