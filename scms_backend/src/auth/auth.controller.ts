import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AuthService } from './auth.service';
import { Userdto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('signin')
  signin() {
    return { message: 'Hello world' };
  }
  @Post('signup')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('avater', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 8000000 },
      storage: diskStorage({
        destination: './upload/avater',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  signUp(@Body() dto: Userdto, @UploadedFile() avater: Express.Multer.File) {
    dto.avater = avater.filename;
    return this.authService.singUp(dto, 'customer');
  }
  @Post('seller/signup')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('avater', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 8000000 },
      storage: diskStorage({
        destination: './upload/avater',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  sellerSignUp(
    @Body() dto: Userdto,
    @UploadedFile() avater: Express.Multer.File,
  ) {
    dto.avater = avater.filename;
    return this.authService.singUp(dto, 'seller');
  }
  @Post('admin/signup')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('avater', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 8000000 },
      storage: diskStorage({
        destination: './upload/avater',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  adminSignUp(
    @Body() dto: Userdto,
    @UploadedFile() avater: Express.Multer.File,
  ) {
    dto.avater = avater.filename;
    return this.authService.singUp(dto, 'admin');
  }
}
