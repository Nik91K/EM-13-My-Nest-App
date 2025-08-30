import { Module } from '@nestjs/common'; 
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'; 
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { databaseConfig } from './database/database.config'; 

@Module({ 
  imports: [ ConfigModule.forRoot({ load: [databaseConfig], }), 
  TypeOrmModule.forRootAsync({ 
    imports: [ConfigModule], 
    inject:[ConfigService], 
    useFactory: (configService: ConfigService) => configService.get('database') as TypeOrmModuleOptions, }), ], 
  controllers: [], 
  providers: [], 
}) 

export class AppModule {}