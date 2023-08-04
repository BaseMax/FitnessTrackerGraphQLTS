import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutResolver } from './workout.resolver';
import { WorkoutService } from './workout.service';

describe('WorkoutResolver', () => {
  let resolver: WorkoutResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutResolver, WorkoutService],
    }).compile();

    resolver = module.get<WorkoutResolver>(WorkoutResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
