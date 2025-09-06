import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Establishment } from './entities/establishment.entity';

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  @ApiOperation({summary: 'Create establishment'})
  @ApiCreatedResponse({ description: "Create success", type: Establishment})
  @ApiBadRequestResponse({ description: "Bad request data"})
  create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return this.establishmentService.create(createEstablishmentDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all reservations from establishments'})
  @ApiOkResponse({ type: [Establishment]})
  getAllReservation(@Param('id') id:string) {
    return this.establishmentService.getAllReservation();
  }

  @Patch(':id')
  @ApiOperation({summary: 'Updating information about establishment ///// MODERATOR, ADMIN'})
  @ApiOkResponse({ type: Establishment})
  @ApiNotFoundResponse({description:'Invalid id'})
  update(@Param('id') id: string, @Body() updateEstablishmentDto: UpdateEstablishmentDto) {
    return this.establishmentService.edit(+id, updateEstablishmentDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete establishment'})
  @ApiNotFoundResponse({description:'Invalid id'})
  remove(@Param('id') id: string) {
    return this.establishmentService.remove(+id);
  }
}
