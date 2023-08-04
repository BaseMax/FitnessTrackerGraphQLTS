import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseReviewService } from './exercise-review.service';

describe('ExerciseReviewService', () => {
  let service: ExerciseReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseReviewService],
    }).compile();

    service = module.get<ExerciseReviewService>(ExerciseReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
