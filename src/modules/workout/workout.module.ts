import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutResolver } from './workout.resolver';

@Module({
  providers: [WorkoutResolver, WorkoutService]
})
export class WorkoutModule {}
