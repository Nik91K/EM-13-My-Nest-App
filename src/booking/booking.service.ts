import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Establishment } from 'src/establishment/entities/establishment.entity';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
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

    const time = new Date(`${createBookingDto.bookingDate}T${createBookingDto.bookingTime}`)

    const oneHourBefore = new Date(time.getTime() - 60 * 60 * 1000)
    const oneHourAfter = new Date(time.getTime() + 60 * 60 * 1000)

    const seatsRequested = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('SUM(booking.numberOfGuests)', 'sum')
      .where('booking.establishmentId = :establishmentId', { establishmentId: createBookingDto.establishment }) 
      .andWhere('booking.bookingDate = :bookingDate', { bookingDate: createBookingDto.bookingDate })
      .andWhere('booking.bookingTime BETWEEN :oneHourBefore AND :oneHourAfter', { oneHourBefore, oneHourAfter })
      .andWhere('booking.status = :status', { status: BookingStatus.CONFIRMED })
      .getRawOne()

    if (parseInt(seatsRequested.sum) + createBookingDto.numberOfGuests > establishment.totalSeats) {
      throw new BadRequestException('Not enough seats available')
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
