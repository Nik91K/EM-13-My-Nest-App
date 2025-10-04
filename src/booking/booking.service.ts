import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Establishment } from 'src/establishment/entities/establishment.entity';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { AvailabilityService } from 'src/availability/availability.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
    private availabilityService: AvailabilityService,
  ) {}


  async create(createBookingDto: CreateBookingDto, userId: number): Promise<Booking> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const establishment = await this.establishmentRepository.findOne({ 
      where: { id: createBookingDto.establishment } 
    })
    if (!establishment) {
      throw new NotFoundException('Establishment not found')
    }

    const bookingDate = createBookingDto.bookingDate
    const numberOfGuests = createBookingDto.numberOfGuests

    if (numberOfGuests > establishment.totalSeats) {
      throw new BadRequestException(`Number of guests exceeds total seats (${establishment.totalSeats})`)
    }

    try {
      await this.availabilityService.recordReservations(
        establishment.id,
        bookingDate,
        numberOfGuests
      )
    } catch (error) {
      throw error
    }

    const booking = this.bookingRepository.create({
      user,
      establishment,
      bookingDate: new Date(createBookingDto.bookingDate),
      bookingTime: createBookingDto.bookingTime,
      numberOfGuests: createBookingDto.numberOfGuests
    })

    return await this.bookingRepository.save(booking)
  }
  
}
