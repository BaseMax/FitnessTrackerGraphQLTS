import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Workout } from '../../workout/entities/workout.entity';
import { ExerciseReview } from '../../exercise-review/entities/exercise-review.entity';
import { ExerciseCategory } from '../../exercise-category/entities/exercise-category.entity';

@ObjectType()
export class Exercise {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  sets: number;

  @Field(() => Int)
  reps: number;

  @Field(() => Float)
  weight: number;

  @Field(() => Workout)
  workout: Workout;

  WorkoutLog: any;

  @Field(() => ExerciseCategory, { nullable: true })
  category: ExerciseCategory;

  @Field(() => [ExerciseReview], { nullable: true })
  reviews: ExerciseReview[];
}
