import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class RegisterInput {
  /*@Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;*/

  @Field(() => String)
  @IsString()
  @MinLength(5)
  username: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
