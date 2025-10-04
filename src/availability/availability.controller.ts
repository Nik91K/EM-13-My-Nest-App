import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { ReservationDto } from './dto/reservation-availability.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post('reserve')
  @ApiOperation({ summary: 'Reserve seats' })
  @ApiResponse({ status: 201, description: 'Seats reserved' })
  async reserve(@Body() dto: ReservationDto): Promise<{ message: string }> {
    await this.availabilityService.recordReservations(
      dto.establishmentId,
      dto.date,
      dto.count,
    )
    return { message: 'Reservation recorded successfully' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the availability of places in a specific establishment' })
  @ApiResponse({ status: 200, description: 'Availability records retrieved successfully' })
  async getEstablishmentAvailability(@Param('id', ParseIntPipe) id: number ) {
    return this.availabilityService.getEstablishmentAvailability(id)
  }
}
