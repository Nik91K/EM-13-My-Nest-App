import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { User } from 'src/auth/entities/user.entity';
import { Establishment } from 'src/establishment/entities/establishment.entity';
import { AvailabilityModule } from 'src/availability/availability.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, User, Establishment]),
    AvailabilityModule
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}