import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  password: string;
}
