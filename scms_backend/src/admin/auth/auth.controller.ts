import { Body, Controller, Post } from '@nestjs/common';
import { Authdto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signUp(@Body() dto: Authdto) {
    return this.authService.singUp(dto);
  }
}
