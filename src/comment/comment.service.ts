import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {

  constructor (
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ){}

  async create (createCommentDto: CreateCommentDto) {
    return this.commentRepository.save(this.commentRepository.create(createCommentDto))
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
