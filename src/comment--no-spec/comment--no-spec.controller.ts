import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentNoSpecService } from './comment--no-spec.service';
import { CreateCommentNoSpecDto } from './dto/create-comment--no-spec.dto';
import { UpdateCommentDto } from './dto/update-comment--no-spec.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentNoSpec } from './entities/comment--no-spec.entity';

@ApiTags("comments")
@Controller('comment--no-spec')
export class CommentNoSpecController {
  constructor(private readonly commentNoSpecService: CommentNoSpecService) {}

  @Post()
  @ApiOperation({summary: 'Create new comment'})
  @ApiCreatedResponse({ description: "Create success", type: CommentNoSpec})
  @ApiBadRequestResponse({ description: "Bad request data"})
  create(@Body() createCommentNoSpecDto: CreateCommentNoSpecDto) {
    return this.commentNoSpecService.create(createCommentNoSpecDto)
  }

  @Get()
  @ApiOperation({summary: 'Find all comments'})
  @ApiOkResponse({ type: [CommentNoSpec]})
  findAll() {
    return this.commentNoSpecService.findByEstablishment()
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update  comment'})
  @ApiOkResponse({ type: CommentNoSpec})
  @ApiNotFoundResponse({description:'Invalid id'})
  update(@Param('id') id: string, @Body() updateCommentNoSpecDto: UpdateCommentDto) {
    return this.commentNoSpecService.update(+id, updateCommentNoSpecDto)
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete  comment'})
  @ApiNotFoundResponse({description:'Invalid id'})
  remove(@Param('id') id: string) {
    return this.commentNoSpecService.remove(+id)
  }

}
