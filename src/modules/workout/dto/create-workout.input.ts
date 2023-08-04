import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateWorkoutInput {
  @Field(() => String)
  @IsString()
  @MinLength(6, { message: 'The name must be at least 6 characters long' })
  @MaxLength(30, { message: 'The maximum name must be 30 characters' })
  name: string;
}
