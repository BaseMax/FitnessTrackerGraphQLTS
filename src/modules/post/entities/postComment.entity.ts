import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Post } from './post.entity';

@ObjectType()
export class PostComment {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  post: Post;

  @Field(() => Date)
  createdAt: Date;
}
