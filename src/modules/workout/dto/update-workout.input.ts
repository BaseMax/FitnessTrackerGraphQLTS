import { CreateWorkoutInput } from './create-workout.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkoutInput extends PartialType(CreateWorkoutInput) {
  @Field(() => Int)
  workoutId: number;
}
