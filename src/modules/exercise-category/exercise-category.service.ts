import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExerciseCategoryInput } from './dto/create-exercise-category.input';
import { UpdateExerciseCategoryInput } from './dto/update-exercise-category.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExerciseCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  getExerciseCategories() {
    return this.prisma.exerciseCategory.findMany({
      include: { exercises: true },
    });
  }

  async create(createExerciseCategoryInput: CreateExerciseCategoryInput) {
    const exerciseCategoryExists = await this.prisma.exerciseCategory.findFirst(
      {
        where: { name: createExerciseCategoryInput.name },
      },
    );

    if (exerciseCategoryExists)
      throw new BadRequestException(
        'The category with this name has already been registered',
      );

    return this.prisma.exerciseCategory.create({
      data: {
        name: createExerciseCategoryInput.name,
      },
    });
  }

  findAll() {
    return `This action returns all exerciseCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseCategory`;
  }

  update(id: number, updateExerciseCategoryInput: UpdateExerciseCategoryInput) {
    return this.prisma.exerciseCategory.update({
      where: { id },
      data: {
        name: updateExerciseCategoryInput.name,
      },
    });
  }

  remove(id: number) {
    return this.prisma.exerciseCategory.delete({ where: { id } });
  }
}
