import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExerciseReviewService } from './exercise-review.service';
import { ExerciseReview } from './entities/exercise-review.entity';
import { CreateExerciseReviewInput } from './dto/create-exercise-review.input';
import { UpdateExerciseReviewInput } from './dto/update-exercise-review.input';
import { GetCurrentUserId } from '../../common/decorators';

@Resolver(() => ExerciseReview)
export class ExerciseReviewResolver {
  constructor(private readonly exerciseReviewService: ExerciseReviewService) {}

  @Mutation(() => ExerciseReview)
  createExerciseReview(
    @GetCurrentUserId() userId: number,
    @Args('createExerciseReviewInput')
    createExerciseReviewInput: CreateExerciseReviewInput,
  ) {
    return this.exerciseReviewService.create(userId, createExerciseReviewInput);
  }

  @Query(() => [ExerciseReview], { name: 'exerciseReview' })
  findAll() {
    return this.exerciseReviewService.findAll();
  }

  @Query(() => ExerciseReview, { name: 'exerciseReview' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.exerciseReviewService.findOne(id);
  }

  @Mutation(() => ExerciseReview)
  updateExerciseReview(
    @GetCurrentUserId() userId: number,
    @Args('updateExerciseReviewInput')
    updateExerciseReviewInput: UpdateExerciseReviewInput,
  ) {
    return this.exerciseReviewService.update(userId, updateExerciseReviewInput);
  }

  @Mutation(() => ExerciseReview)
  removeExerciseReview(
    @GetCurrentUserId() userId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.exerciseReviewService.remove(+userId, +id);
  }
}
