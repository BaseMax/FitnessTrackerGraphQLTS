import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseReviewResolver } from './exercise-review.resolver';
import { ExerciseReviewService } from './exercise-review.service';

describe('ExerciseReviewResolver', () => {
  let resolver: ExerciseReviewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseReviewResolver, ExerciseReviewService],
    }).compile();

    resolver = module.get<ExerciseReviewResolver>(ExerciseReviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
