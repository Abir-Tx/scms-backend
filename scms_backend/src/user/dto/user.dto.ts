import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class Userdto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'name must be string' })
  name: string;
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString({ message: 'username must be string' })
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
  @IsNotEmpty()
  @IsString()
  avater: string;
  @IsNotEmpty()
  @IsString()
  role: string;
}
