import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@ObjectType()
export class Workout {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => User)
  user: User;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @Field(() => [Like], { nullable: true })
  likes: Like[];

  @Field(() => Int)
  numberOfLikes: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
