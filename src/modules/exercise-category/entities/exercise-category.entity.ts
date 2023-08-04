import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Exercise } from '../../exercise/entities/exercise.entity';

@ObjectType()
export class ExerciseCategory {
  @Field(() => Int)
  id: number;

  @Field(() => [Exercise])
  exercises: Exercise[];

  @Field(() => String)
  name: string;
}
