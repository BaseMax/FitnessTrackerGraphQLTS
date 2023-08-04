import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFriendInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
