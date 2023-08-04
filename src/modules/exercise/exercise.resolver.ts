import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExerciseService } from './exercise.service';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { GetCurrentUserId } from '../../common/decorators';

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Mutation(() => Exercise)
  createExercise(
    @GetCurrentUserId() userId: number,
    @Args('createExerciseInput') createExerciseInput: CreateExerciseInput,
  ) {
    return this.exerciseService.create(+userId, createExerciseInput);
  }

  @Query(() => [Exercise], { name: 'exercise' })
  findAll() {
    return this.exerciseService.findAll();
  }

  @Query(() => Exercise)
  getExerciseByName(@Args('name', { type: () => String }) name: string) {
    return this.exerciseService.getByName(name);
  }

  @Query(() => Exercise)
  getExerciseDetails(@Args('id', { type: () => Int }) id: number) {
    return this.exerciseService.findOne(id);
  }

  @Mutation(() => Exercise)
  updateExercise(
    @GetCurrentUserId() userId: number,
    @Args('updateExerciseInput') updateExerciseInput: UpdateExerciseInput,
  ) {
    return this.exerciseService.update(userId, updateExerciseInput);
  }

  @Mutation(() => Exercise)
  deleteExercise(
    @GetCurrentUserId() userId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.exerciseService.remove(+userId, +id);
  }
}
