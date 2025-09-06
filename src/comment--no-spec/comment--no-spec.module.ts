import { Module } from '@nestjs/common';
import { CommentNoSpecService } from './comment--no-spec.service';
import { CommentNoSpecController } from './comment--no-spec.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentNoSpec } from './entities/comment--no-spec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentNoSpec])],
  controllers: [CommentNoSpecController],
  providers: [CommentNoSpecService],
})
export class CommentNoSpecModule {}
