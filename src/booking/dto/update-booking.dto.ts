import { PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '../entities/booking.entity';

// extends PartialType(CreateBookingDto)

export class UpdateBookingDto {
  @ApiProperty({ 
    description: 'Статус бронювання', 
    enum: BookingStatus,
    required: false 
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
  numberOfGuests: any;
  bookingDate: any;
}