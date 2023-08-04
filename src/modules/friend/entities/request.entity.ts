import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { RequestStatus } from '@prisma/client';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Request {
  @Field(() => Int)
  id: number;

  @Field(() => RequestStatus)
  status: RequestStatus;

  @Field(() => User)
  sender: User;

  @Field(() => User)
  receiver: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

registerEnumType(RequestStatus, { name: 'requestStatus' });
