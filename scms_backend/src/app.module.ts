import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { TypeormModule } from './typeorm/typeorm.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5434,
      username: 'postgres',
      password: 'proGRAMMER6996!@#',
      database: 'scms',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeormModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
