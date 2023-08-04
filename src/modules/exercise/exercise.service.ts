import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { UpdateExerciseInput } from './dto/update-exercise.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createExerciseInput: CreateExerciseInput) {
    const workout = await this.prisma.workout.findUnique({
      where: { id: createExerciseInput.workoutId },
    });

    if (!workout) throw new BadRequestException('workout not found!');
    if (workout.userId !== userId)
      throw new ForbiddenException(
        'You do not have permission to access this workout',
      );

    return this.prisma.exercise.create({
      data: {
        name: createExerciseInput.name,
        weight: createExerciseInput.weight,
        sets: createExerciseInput.sets,
        reps: createExerciseInput.reps,
        workout: {
          connect: { id: createExerciseInput.workoutId },
        },
        category: {
          connectOrCreate: {
            where: { id: createExerciseInput?.categoryId },
            create: { name: createExerciseInput?.categoryName },
          },
        },
      },
      include: { workout: true },
    });
  }

  findAll() {
    return `This action returns all exercise`;
  }

  getByName(name: string) {
    const exercise = this.prisma.exercise.findFirst({
      where: { name },
      include: { workout: true },
    });
    if (!exercise) throw new NotFoundException('exercise not found!');

    return exercise;
  }

  findOne(id: number) {
    const exercise = this.prisma.exercise.findUnique({
      where: { id },
      include: { workout: true },
    });
    if (!exercise) throw new NotFoundException('exercise not found!');

    return exercise;
  }

  async update(userId: number, updateExerciseInput: UpdateExerciseInput) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: updateExerciseInput.id },
    });

    const workout = await this.prisma.workout.findUnique({
      where: { id: exercise.workoutId },
    });

    if (!exercise || !workout)
      throw new BadRequestException('exercise not valid');

    if (workout.userId !== userId)
      throw new ForbiddenException(
        'You do not have permission to access this workout',
      );

    return this.prisma.exercise.update({
      where: { id: updateExerciseInput.id },
      data: { ...updateExerciseInput },
      include: { workout: true },
    });
  }

  async remove(userId: number, id: number) {
    const exercise = await this.prisma.exercise.findUnique({ where: { id } });
    const workout = await this.prisma.workout.findUnique({
      where: { id: exercise.workoutId },
    });

    if (!exercise || !workout)
      throw new BadRequestException('exercise not valid!');

    if (workout.userId !== userId)
      throw new ForbiddenException(
        'You do not have permission to access this workout',
      );

    return this.prisma.exercise.delete({
      where: { id },
    });
  }
}
