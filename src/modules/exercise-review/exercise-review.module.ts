import { Module } from '@nestjs/common';
import { ExerciseReviewService } from './exercise-review.service';
import { ExerciseReviewResolver } from './exercise-review.resolver';

@Module({
  providers: [ExerciseReviewResolver, ExerciseReviewService]
})
export class ExerciseReviewModule {}
