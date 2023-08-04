import { CreateFriendInput } from './create-friend.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFriendInput extends PartialType(CreateFriendInput) {
  @Field(() => Int)
  id: number;
}
