import { Module } from '@nestjs/common';
import { ExerciseCategoryService } from './exercise-category.service';
import { ExerciseCategoryResolver } from './exercise-category.resolver';

@Module({
  providers: [ExerciseCategoryResolver, ExerciseCategoryService]
})
export class ExerciseCategoryModule {}
