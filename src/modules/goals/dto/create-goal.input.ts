import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGoalInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  target: string;
}
