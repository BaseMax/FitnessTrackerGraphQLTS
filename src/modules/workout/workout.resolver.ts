import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkoutService } from './workout.service';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { UpdateWorkoutInput } from './dto/update-workout.input';
import { GetCurrentUserId, Public } from '../../common/decorators';
import { CreateCommentInput } from './dto/create-comment.input';
import { LogWorkoutInput } from './dto/log.input';
import { FitnessStatistics } from './entities/statistics.entity';

@Resolver(() => Workout)
export class WorkoutResolver {
  constructor(private readonly workoutService: WorkoutService) {}

  @Mutation(() => Workout)
  likeWorkout(
    @GetCurrentUserId() userId: number,
    @Args('workoutId') workoutId: number,
  ) {
    return this.workoutService.likeWorkout(+userId, +workoutId);
  }

  @Mutation(() => Workout)
  commentOnWorkout(
    @GetCurrentUserId() userId: number,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.workoutService.commentOnWorkout(+userId, createCommentInput);
  }

  @Mutation(() => Workout)
  deleteWorkoutComment(
    @GetCurrentUserId() userId: number,
    @Args('commentId', { type: () => Int }) id: number,
  ) {
    return this.workoutService.deleteWorkoutComment(userId, id);
  }

  @Mutation(() => Workout)
  createWorkoutRoutine(
    @GetCurrentUserId() userId: number,
    @Args('createWorkoutInput') createWorkoutInput: CreateWorkoutInput,
  ) {
    return this.workoutService.create(+userId, createWorkoutInput);
  }

  @Query(() => [Workout])
  getUserWorkoutHistory(@GetCurrentUserId() userId: number) {
    return this.workoutService.getUserWorkoutHistory(+userId);
  }

  @Query(() => [Workout])
  getWorkoutsByExercise(
    @Args('exerciseId', { type: () => Int }) exerciseId: number,
  ) {
    return this.workoutService.getWorkoutsByExercise(+exerciseId);
  }

  @Query(() => [Workout])
  getWorkoutRecommendations() {
    return this.workoutService.getWorkoutRecommendations();
  }

  @Query(() => FitnessStatistics)
  getStatistics(@GetCurrentUserId() userId: number) {
    return this.workoutService.getStatistics(userId);
  }

  @Query(() => Workout)
  getWorkoutRoutine(@Args('id', { type: () => Int }) id: number) {
    return this.workoutService.getWorkoutRoutine(id),
  }

  @Query(() => [Workout])
  getWorkoutsByDate(
    @GetCurrentUserId() userId: number,
    @Args('date', { type: () => Date }) date: Date,
  ) {
    return this.workoutService.getWorkoutsByDate(userId, date);
  }

  @Query(() => [Workout])
  getFriendsWorkoutHistory(@GetCurrentUserId() userId: number) {
    return this.workoutService.getFriendsWorkoutHistory(+userId);
  }

  @Public()
  @Query(() => [Workout])
  getPopularWorkouts() {
    return this.workoutService.getPopularWorkouts();
  }

  @Query(() => [Workout], { name: 'getAllWorkoutRoutines' })
  findAll() {
    return this.workoutService.findAll();
  }

  @Query(() => Workout, { name: 'getWorkoutDetails' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.workoutService.findOne(id);
  }

  @Query(() => [Workout])
  searchWorkouts(
    @Args('name', { type: () => String }) name: string,
    @Args('date', { nullable: true, type: () => Date }) date?: Date,
  ) {
    return this.workoutService.search(name, date);
  }

  @Mutation(() => Workout)
  updateWorkoutRoutine(
    @GetCurrentUserId() userId: number,
    @Args('updateWorkoutInput') updateWorkoutInput: UpdateWorkoutInput,
  ) {
    return this.workoutService.update(+userId, updateWorkoutInput);
  }

  @Mutation(() => Workout)
  logWorkout(
    @GetCurrentUserId() userId: number,
    @Args('logWorkoutInput') logWorkoutInput: LogWorkoutInput,
  ) {
    return this.workoutService.logWorkout(+userId, logWorkoutInput);
  }

  @Mutation(() => Workout)
  deleteWorkoutRoutine(
    @GetCurrentUserId() userId: number,
    @Args('workoutId', { type: () => Int }) workoutId: number,
  ) {
    return this.workoutService.remove(+userId, +workoutId);
  }
}
