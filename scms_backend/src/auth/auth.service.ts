import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdto } from 'src/user/dto';
import { v1 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}
  async singUp(dto: Userdto, role: string) {
    const password = dto.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = Math.floor(Math.random() * 1000);

    try {
      const user = {
        id: id,
        name: dto.name,
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        phone: dto.phone,
        address: dto.address,
        avater: dto.avater,
        role: role,
      };
      return this.userRepo.save(user);
    } catch (err) {
      if (err.code === '23505') {
        return { err_msg: 'user Already exist!' };
      }
    }
  }
}
