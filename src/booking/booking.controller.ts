import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: 201, description: 'Reservation successfully created' })
  @ApiResponse({ status: 400, description: 'Incorrect information or time already booked' })
  @ApiResponse({ status: 404, description: 'No establishment found' })
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingService.create(createBookingDto, req.user.id)
  }
}
