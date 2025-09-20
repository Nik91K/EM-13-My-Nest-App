import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { Availability } from './entities/availability.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from 'src/establishment/entities/establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Availability, Establishment])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
  exports: [AvailabilityService]
})

export class AvailabilityModule {}
