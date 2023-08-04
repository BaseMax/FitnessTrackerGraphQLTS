import { CreateExerciseReviewInput } from './create-exercise-review.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExerciseReviewInput extends PartialType(
  CreateExerciseReviewInput,
) {
  @Field(() => Int)
  id: number;
}
