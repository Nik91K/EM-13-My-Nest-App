import { Module } from '@nestjs/common'; 
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'; 
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { databaseConfig } from './database/database.config'; 
import { EstablishmentModule } from './establishment/establishment.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { AvailabilityModule } from './availability/availability.module';
import { BookingModule } from './booking/booking.module';
import { UsersModule } from './users/users.module';

@Module({ 
  imports: [ ConfigModule.forRoot({ 
    load: [databaseConfig],
    isGlobal: true,
    envFilePath: ".env"
  }), 
  TypeOrmModule.forRootAsync({ 
    imports: [ConfigModule], 
    inject:[ConfigService], 
    useFactory: (configService: ConfigService) => configService.get('database') as TypeOrmModuleOptions, }), 
    EstablishmentModule, 
    CommentModule, 
    AuthModule, AvailabilityModule, BookingModule, UsersModule, 
  ], 
  controllers: [], 
  providers: [], 
}) 

export class AppModule {}
