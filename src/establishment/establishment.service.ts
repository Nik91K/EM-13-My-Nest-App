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
    private establishmentRepository: Repository<Establishment>
  ){}

  async create (createEstablishmentDto: CreateEstablishmentDto) {
    return this.establishmentRepository.save(this.establishmentRepository.create(createEstablishmentDto))
  }

  async getAllReservation (): Promise<Establishment[]> {
    return this.establishmentRepository.find()
  }

  async getAllComments (id: number) {
    const establishment = await this.establishmentRepository.findOne({
      where: { id: id },
      relations: ['comments']
    })

    if(!establishment) {
      throw new NotFoundException(`Establishment ${id} invalid`)
    }

    return establishment.comments
  }

  async edit (id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    const establishment = await this.establishmentRepository.findOneBy({id})

    if(!establishment) {
      throw new NotFoundException(`Establishment ${id} invalid`)
    }

    this.establishmentRepository.merge(establishment, updateEstablishmentDto)
    return this.establishmentRepository.save(establishment)
  }

  async remove (id: number) {
    const result = await this.establishmentRepository.delete(id)
    return result
  }

}
