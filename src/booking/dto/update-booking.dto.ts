import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '../entities/booking.entity';

export class UpdateBookingDto {
  @ApiProperty({ 
    description: 'Reservation status', 
    enum: BookingStatus,
    required: false 
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
  numberOfGuests: any;
  bookingDate: any;
}