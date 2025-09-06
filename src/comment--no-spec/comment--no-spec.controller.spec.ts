import { Test, TestingModule } from '@nestjs/testing';
import { CommentNoSpecController } from './comment--no-spec.controller';
import { CommentNoSpecService } from './comment--no-spec.service';

describe('CommentNoSpecController', () => {
  let controller: CommentNoSpecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentNoSpecController],
      providers: [CommentNoSpecService],
    }).compile();

    controller = module.get<CommentNoSpecController>(CommentNoSpecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
