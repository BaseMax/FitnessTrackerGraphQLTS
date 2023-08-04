import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExerciseReviewInput } from './dto/create-exercise-review.input';
import { UpdateExerciseReviewInput } from './dto/update-exercise-review.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExerciseReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    createExerciseReviewInput: CreateExerciseReviewInput,
  ) {
    const reviewExists = await this.prisma.exerciseReview.findFirst({
      where: {
        userId,
        exerciseId: createExerciseReviewInput.exerciseId,
      },
    });

    if (reviewExists)
      throw new BadRequestException('You have already reviewed this exercise');

    return this.prisma.exerciseReview.create({
      data: {
        text: createExerciseReviewInput.text,
        rate: createExerciseReviewInput.rate,
        exercise: {
          connect: { id: createExerciseReviewInput.exerciseId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  findAll() {
    return `This action returns all exerciseReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseReview`;
  }

  async update(
    userId: number,
    updateExerciseReviewInput: UpdateExerciseReviewInput,
  ) {
    const exerciseReview = await this.prisma.exerciseReview.findUnique({
      where: { id: updateExerciseReviewInput.id },
    });

    if (!exerciseReview) throw new NotFoundException('review not found!');
    if (exerciseReview.userId !== userId)
      throw new ForbiddenException(
        'You do not have permission to access this exercise review',
      );

    return this.prisma.exerciseReview.update({
      where: { id: exerciseReview.id },
      data: {
        ...updateExerciseReviewInput,
      },
    });
  }

  async remove(userId: number, id: number) {
    const exerciseReview = await this.prisma.exerciseReview.findUnique({
      where: { id },
    });

    if (!exerciseReview) throw new NotFoundException('review not found!');

    if (exerciseReview.userId !== userId)
      throw new ForbiddenException(
        'You do not have permission to access this exercise review',
      );

    return this.prisma.exerciseReview.delete({ where: { id } });
  }
}
