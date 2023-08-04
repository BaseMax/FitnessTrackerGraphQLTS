import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostCommentInput {
  @Field(() => Int)
  postId: number;

  @Field(() => String)
  text: string;
}
