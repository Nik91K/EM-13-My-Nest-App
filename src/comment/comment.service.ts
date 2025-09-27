import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Establishment } from 'src/establishment/entities/establishment.entity';

@Injectable()
export class CommentService {
  constructor (
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
  ){}

  async create (createCommentDto: CreateCommentDto) {
    const { establishmentId, ...data } = createCommentDto
    const establishment = await this.establishmentRepository.findOneBy({ id: establishmentId})

    if (!establishment) {
      throw new NotFoundException(`Establishment ${establishmentId} not found`);
    }

    const comment = this.commentRepository.create({
      ...data,
      establishment
    })

    return this.commentRepository.save(comment)
  }

  async findByEstablishment() {}

  async update(id: number, updateCreateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOneBy({id});

    if(!comment)
      throw new NotFoundException(`Comment ${id} invalid`)

    this.commentRepository.merge(comment, updateCreateCommentDto)
    return this.commentRepository.save(comment)
  }

  async remove(id: number) {
    const result = await this.commentRepository.delete(id)
    return result
  }

}
