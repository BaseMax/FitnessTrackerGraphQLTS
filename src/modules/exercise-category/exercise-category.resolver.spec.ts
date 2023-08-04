import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseCategoryResolver } from './exercise-category.resolver';
import { ExerciseCategoryService } from './exercise-category.service';

describe('ExerciseCategoryResolver', () => {
  let resolver: ExerciseCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseCategoryResolver, ExerciseCategoryService],
    }).compile();

    resolver = module.get<ExerciseCategoryResolver>(ExerciseCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
