import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExerciseCategoryService } from './exercise-category.service';
import { ExerciseCategory } from './entities/exercise-category.entity';
import { CreateExerciseCategoryInput } from './dto/create-exercise-category.input';
import { UpdateExerciseCategoryInput } from './dto/update-exercise-category.input';
import { Roles } from '../../common/decorators';
import { Role } from '@prisma/client';

@Resolver(() => ExerciseCategory)
export class ExerciseCategoryResolver {
  constructor(
    private readonly exerciseCategoryService: ExerciseCategoryService,
  ) {}

  @Query(() => [ExerciseCategory])
  getExerciseCategories() {
    return this.exerciseCategoryService.getExerciseCategories();
  }

  @Roles(Role.admin)
  @Mutation(() => ExerciseCategory)
  createExerciseCategory(
    @Args('createExerciseCategoryInput')
    createExerciseCategoryInput: CreateExerciseCategoryInput,
  ) {
    return this.exerciseCategoryService.create(createExerciseCategoryInput);
  }

  @Query(() => [ExerciseCategory], { name: 'exerciseCategory' })
  findAll() {
    return this.exerciseCategoryService.findAll();
  }

  @Query(() => ExerciseCategory, { name: 'exerciseCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.exerciseCategoryService.findOne(id);
  }

  @Roles(Role.admin)
  @Mutation(() => ExerciseCategory)
  updateExerciseCategory(
    @Args('updateExerciseCategoryInput')
    updateExerciseCategoryInput: UpdateExerciseCategoryInput,
  ) {
    return this.exerciseCategoryService.update(
      updateExerciseCategoryInput.id,
      updateExerciseCategoryInput,
    );
  }

  @Roles(Role.admin)
  @Mutation(() => ExerciseCategory)
  removeExerciseCategory(@Args('id', { type: () => Int }) id: number) {
    return this.exerciseCategoryService.remove(id);
  }
}
