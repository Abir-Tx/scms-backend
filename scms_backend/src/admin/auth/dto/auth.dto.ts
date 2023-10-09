import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class Authdto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^@.{2,5}$/, { message: 'username contains special character.' })
  username: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,10}$/)
  password: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  address: string;
}
