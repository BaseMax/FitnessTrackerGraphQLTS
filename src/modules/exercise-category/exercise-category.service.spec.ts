import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseCategoryService } from './exercise-category.service';

describe('ExerciseCategoryService', () => {
  let service: ExerciseCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseCategoryService],
    }).compile();

    service = module.get<ExerciseCategoryService>(ExerciseCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
