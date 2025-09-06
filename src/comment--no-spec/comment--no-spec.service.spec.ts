import { Test, TestingModule } from '@nestjs/testing';
import { CommentNoSpecService } from './comment--no-spec.service';

describe('CommentNoSpecService', () => {
  let service: CommentNoSpecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentNoSpecService],
    }).compile();

    service = module.get<CommentNoSpecService>(CommentNoSpecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
