import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { GetAvailabilityDto } from './dto/get-availability.dto';
import { ReservationDto } from './dto/reservation-availability.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SetAvailabilityDto } from './dto/set-availability.dto';

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

}
