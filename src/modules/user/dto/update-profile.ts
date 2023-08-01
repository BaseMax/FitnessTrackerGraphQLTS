import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => Int, { nullable: true })
  weight?: number;

  @Field(() => Int, { nullable: true })
  height?: number;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  bio?: string;
}
