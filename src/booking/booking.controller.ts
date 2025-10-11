import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiOkResponse({ description: 'Reservation successfully created' })
  @ApiNotFoundResponse({ description: 'No establishment found' })
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingService.create(createBookingDto, req.user.id)
  }
}
