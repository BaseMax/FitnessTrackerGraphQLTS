import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => Int)
  @IsNumber()
  workoutId: number;

  @Field(() => String)
  @IsString()
  @MinLength(5, { message: 'The text size cannot be more than 5' })
  @MaxLength(200, { message: 'The text size cannot be more than 200 ' })
  text: string;
}
