// statistics.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FitnessStatistics {
  @Field(() => Int)
  totalWorkouts: number;
}
