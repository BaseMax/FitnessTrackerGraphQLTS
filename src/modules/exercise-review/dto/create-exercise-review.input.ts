import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateExerciseReviewInput {
  @Field(() => String)
  text: string;

  @Field(() => Float, { nullable: true })
  rate: number;

  @Field(() => Int)
  exerciseId: number;
}
