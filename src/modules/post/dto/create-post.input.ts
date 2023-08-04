import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Int)
  workoutId: number;
}
