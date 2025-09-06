import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentNoSpecDto } from './dto/create-comment--no-spec.dto';
import { UpdateCommentDto } from './dto/update-comment--no-spec.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentNoSpec } from './entities/comment--no-spec.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentNoSpecService {

  constructor (
    @InjectRepository(CommentNoSpec)
    private commentRepository: Repository<CommentNoSpec>
  ){}

  async create (createCommentDto: CreateCommentNoSpecDto) {
    return this.commentRepository.save(this.commentRepository.create(createCommentDto))
  }

  async findByEstablishment() {
    return this.commentRepository.find({
      where: {}
      //establishment
    })
  }

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
