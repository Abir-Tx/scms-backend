import { Injectable } from '@nestjs/common';
import { Userdto } from 'src/user/dto';
import { v1 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async singUp(dto: Userdto, role: string) {
    const password = dto.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      id: uuidv4(),
      name: dto.name,
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      phone: dto.phone,
      address: dto.address,
      avater: dto.avater,
      role: role,
    };
    return user;
  }
}
