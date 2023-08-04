import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateExerciseInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  sets: number;

  @Field(() => Int)
  reps: number;

  @Field(() => Float)
  weight: number;

  @Field(() => Int)
  workoutId: number;

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field(() => String, { nullable: true })
  categoryName?: string;
}
