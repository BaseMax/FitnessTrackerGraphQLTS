import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateExerciseCategoryInput {
  @Field(() => String)
  name: string;
}
