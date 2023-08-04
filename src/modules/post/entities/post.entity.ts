import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Workout } from '../../workout/entities/workout.entity';
import { PostLike } from './postLike.entity';
import { PostComment } from './postComment.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Int)
  numberOfLikes: number;

  @Field(() => [PostLike])
  likes: PostLike[];

  @Field(() => [PostComment])
  comments: PostComment[];

  @Field(() => Workout)
  workout: Workout;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
