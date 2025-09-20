import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Availability } from 'src/availability/entities/availability.entity';
import { Establishment } from 'src/establishment/entities/establishment.entity';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { UserRole } from 'src/availability/UserRole';
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
      where: { id: parseInt(createBookingDto.establishment) } 
    });
    if (!establishment) {
      throw new NotFoundException('Establishment not found')
    }

    const bookingDate = createBookingDto.bookingDate
    const numberOfGuests = createBookingDto.numberOfGuests

    await this.availabilityService.recordReservations(establishment.id, bookingDate, numberOfGuests);

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      user,
      establishment,
      bookingDate: new Date(createBookingDto.bookingDate),
    });

    return await this.bookingRepository.save(booking)
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      relations: ['user', 'establishment']
    })
  }

  async findByEstablishment(establishmentId: number, userId: number): Promise<Booking[]> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      relations: ['establishment']
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.role === UserRole.MODERATOR) {
      if (!user.establishment || user.establishment.id !== establishmentId) {
        throw new ForbiddenException('You can only view reservations for your establishment')
      }
    } else if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Not enough access rights')
    }

    return await this.bookingRepository.find({
      where: { establishment: { id: establishmentId } },
      relations: ['user', 'establishment']
    })
  }

}
