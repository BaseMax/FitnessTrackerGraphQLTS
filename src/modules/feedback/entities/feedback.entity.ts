import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Feedback {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  createdAt: Date;
}
