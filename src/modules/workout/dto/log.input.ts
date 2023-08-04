import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LogWorkoutInput {
  @Field(() => Int)
  exerciseId: number;

  @Field(() => Date)
  date: Date;

  @Field(() => Int)
  sets: number;

  @Field(() => Int)
  reps: number;

  @Field(() => Float)
  weight: number;
}
