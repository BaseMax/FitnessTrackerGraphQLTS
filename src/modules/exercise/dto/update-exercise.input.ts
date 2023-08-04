import { CreateExerciseInput } from './create-exercise.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExerciseInput extends PartialType(CreateExerciseInput) {
  @Field(() => Int)
  id: number;
}
