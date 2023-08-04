import { Test, TestingModule } from '@nestjs/testing';
import { GoalsResolver } from './goals.resolver';
import { GoalsService } from './goals.service';

describe('GoalsResolver', () => {
  let resolver: GoalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalsResolver, GoalsService],
    }).compile();

    resolver = module.get<GoalsResolver>(GoalsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
