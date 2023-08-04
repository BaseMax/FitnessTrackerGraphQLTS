import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GoalsService } from './goals.service';
import { Goal } from './entities/goal.entity';
import { CreateGoalInput } from './dto/create-goal.input';
import { UpdateGoalInput } from './dto/update-goal.input';
import { GetCurrentUserId } from '../../common/decorators';

@Resolver(() => Goal)
export class GoalsResolver {
  constructor(private readonly goalsService: GoalsService) {}

  @Mutation(() => Goal)
  setFitnessGoals(
    @GetCurrentUserId() userId: number,
    @Args('createGoalInput') createGoalInput: CreateGoalInput,
  ) {
    return this.goalsService.create(+userId, createGoalInput);
  }

  @Query(() => [Goal])
  getFitnessGoals(@GetCurrentUserId() userId: number) {
    return this.goalsService.findAll(+userId);
  }

  @Query(() => Goal, { name: 'goal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.goalsService.findOne(id);
  }

  @Mutation(() => Goal)
  updateGoal(@Args('updateGoalInput') updateGoalInput: UpdateGoalInput) {
    return this.goalsService.update(updateGoalInput.id, updateGoalInput);
  }

  @Mutation(() => Goal)
  removeGoal(@Args('id', { type: () => Int }) id: number) {
    return this.goalsService.remove(id);
  }
}
