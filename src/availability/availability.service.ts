import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { Availability } from './entities/availability.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from 'src/establishment/entities/establishment.entity';

@Injectable()
export class AvailabilityService {
  constructor (
    @InjectRepository(Availability)
    private availabilityRepo: Repository<Availability>,
    @InjectRepository(Establishment)
    private establishmentRepo: Repository<Establishment>,
  ) {}

  async recordReservations(establishmentId: number, date: string, count: number): Promise<void> {
    const establishment = await this.establishmentRepo.findOne({
      where: {id: establishmentId}
    })
    if (!establishment) {
      throw new NotFoundException('Establishment not found')
    }
    let record = await this.availabilityRepo.findOne({
      where: {
        establishment: {id: establishmentId},
        date
      },
      relations: ['establishment']
    })
    if (!record) {
      if (count > establishment.totalSeats) {
        throw new BadRequestException('Not enough seats available')
      }
      record = this.availabilityRepo.create({
        date,
        establishment,
        availableSeats: establishment.totalSeats - count
      })
    } else {
      if (record.availableSeats < count) {
        throw new BadRequestException('Not enough seats available')
      }
      record.availableSeats -= count
    }
    await this.availabilityRepo.save(record)
  }

}
