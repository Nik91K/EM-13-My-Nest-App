import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRole } from 'src/availability/UserRole';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: 201, description: 'Reservation successfully created' })
  @ApiResponse({ status: 400, description: 'Incorrect information or time already booked' })
  @ApiResponse({ status: 404, description: 'No establishment found' })
  create(@Body() createBookingDto: CreateBookingDto, req) {
    return this.bookingService.create(createBookingDto, req.user.id)
  }
}
