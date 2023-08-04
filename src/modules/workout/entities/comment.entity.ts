import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Workout } from './workout.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => User)
  user: User;

  @Field(() => Workout)
  workout: Workout;

  @Field(() => Date)
  createdAt: Date;
}
