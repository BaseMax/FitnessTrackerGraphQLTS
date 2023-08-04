import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseResolver } from './exercise.resolver';
import { ExerciseService } from './exercise.service';

describe('ExerciseResolver', () => {
  let resolver: ExerciseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseResolver, ExerciseService],
    }).compile();

    resolver = module.get<ExerciseResolver>(ExerciseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
