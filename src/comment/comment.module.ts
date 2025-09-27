import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Establishment } from 'src/establishment/entities/establishment.entity';
import { EstablishmentModule } from 'src/establishment/establishment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Establishment]), EstablishmentModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
