import { Injectable } from '@nestjs/common';
import { Authdto } from './dto';

@Injectable()
export class AuthService {
  async singUp(dto: Authdto) {
    const user = {
      name: dto.name,
      username: dto.username,
      phone: dto.phone,
      address: dto.address,
    };
    return user;
  }
}
