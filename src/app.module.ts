import { Module } from '@nestjs/common'; 
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'; 
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { databaseConfig } from './database/database.config'; 
import { CommentNoSpecModule } from './comment--no-spec/comment--no-spec.module';
import { EstablishmentModule } from './establishment/establishment.module';

@Module({ 
  imports: [ ConfigModule.forRoot({ load: [databaseConfig], }), 
  TypeOrmModule.forRootAsync({ 
    imports: [ConfigModule], 
    inject:[ConfigService], 
    useFactory: (configService: ConfigService) => configService.get('database') as TypeOrmModuleOptions, }), CommentNoSpecModule, EstablishmentModule, ], 
  controllers: [], 
  providers: [], 
}) 

export class AppModule {}