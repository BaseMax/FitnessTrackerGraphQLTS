import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Exercise } from '../../exercise/entities/exercise.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class ExerciseReview {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => Float)
  rate: number;

  @Field(() => Exercise)
  exercise: Exercise;

  @Field(() => User)
  user: User;
}
