import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class Userdto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'name must be string' })
  name: string;
  @IsNotEmpty({ message: 'username cannot be empty' })
  @IsString({ message: 'username must be string' })
  @Matches(/^@.{2,10}$/, { message: 'username contains special character.' })
  username: string;
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'password cannot be empty.' })
  @IsString()
  @Matches(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,60}$/, {
    message:
      'Password should contain capital letter, small letter, number & special char',
  })
  password: string;
  @IsNotEmpty({ message: 'Phone number cannot be empty.' })
  @IsString()
  phone: string;
  @IsNotEmpty({ message: 'address cannot be empty.' })
  @IsString({ message: 'address must be string' })
  address: string;
  // @IsNotEmpty()
  // @IsString()
  avater: string;
}
