import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
