import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Establishment } from './entities/establishment.entity';

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create establishment'})
  @ApiResponse({ description: "Create success", type: Establishment, status: 201})
  @ApiResponse({ description: "Bad request data", status: 400})
  create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return this.establishmentService.create(createEstablishmentDto);
  }

  @Get('reservations')
  @ApiOperation({summary: 'Get all reservations from establishments'})
  @ApiResponse({ type: [Establishment], status: 200})
  getAllReservation(@Param('id') id:string) {
    return this.establishmentService.getAllReservation();
  }

  @Get(':id/comments')
  @ApiOperation({summary: 'Get all comments from establishments'})
  @ApiResponse({ type: [Establishment], status: 200 })
  getAllComments(@Param('id') id:string) {
    return this.establishmentService.getAllComments(+id)
  }


  @Patch(':id')
  @ApiOperation({summary: 'Updating information about establishment ///// MODERATOR, ADMIN'})
  @ApiResponse({ type: Establishment, status: 200})
  @ApiResponse({description:'Invalid id', status: 400})
  update(@Param('id') id: string, @Body() updateEstablishmentDto: UpdateEstablishmentDto) {
    return this.establishmentService.edit(+id, updateEstablishmentDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete establishment'})
  @ApiResponse({description:'Invalid id', status: 400})
  remove(@Param('id') id: string) {
    return this.establishmentService.remove(+id);
  }
}
