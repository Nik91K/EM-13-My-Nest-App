import { Delete, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { Establishment } from './entities/establishment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EstablishmentService {
  constructor (
    @InjectRepository(Establishment)
    private establishmenrRepository: Repository<Establishment>
  ){}

  async create (сreateEstablishmentDto: CreateEstablishmentDto) {
    return this.establishmenrRepository.save(this.establishmenrRepository.create(сreateEstablishmentDto))
  }

  async getAllReservation (): Promise<Establishment[]> {
    return this.establishmenrRepository.find()
  }

  async edit (id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    const establishment = await this.establishmenrRepository.findOneBy({id})

    if(!establishment)
      throw new NotFoundException(`Establishment ${id} invalid`)

    this.establishmenrRepository.merge(establishment, updateEstablishmentDto)
    return this.establishmenrRepository.save(establishment)
  }

  async remove (id: number) {
    const result = await this.establishmenrRepository.delete(id)
    return result
  }

}
