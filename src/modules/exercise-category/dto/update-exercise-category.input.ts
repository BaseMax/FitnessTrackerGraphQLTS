import { CreateExerciseCategoryInput } from './create-exercise-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExerciseCategoryInput extends PartialType(CreateExerciseCategoryInput) {
  @Field(() => Int)
  id: number;
}
