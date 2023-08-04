import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { PrivacySetting } from '@prisma/client';

@ObjectType()
export class Goal {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  target: string;

  @Field(() => User, { name: 'user' })
  User: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
