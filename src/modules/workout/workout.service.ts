import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkoutInput } from './dto/create-workout.input';
import { UpdateWorkoutInput } from './dto/update-workout.input';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { isDateString } from 'class-validator';
import { PrivacySetting } from '@prisma/client';
import { LogWorkoutInput } from './dto/log.input';

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserWorkoutHistory(userId: number) {
    const workouts = await this.prisma.workout.findMany({
      where: { userId, user: { workoutHistoryPrivacy: PrivacySetting.public } },
      include: {
        exercise: true,
        comments: true,
        likes: true,
      },
    });

    if (!workouts || workouts.length === 0) {
      throw new NotFoundException('workouts is empty.');
    }

    return workouts;
  }

  async getWorkoutsByExercise(exerciseId: number) {
    const workouts = await this.prisma.workout.findMany({
      where: { exercise: { some: { id: exerciseId } } },
      include: {
        exercise: true,
        user: { select: { password: false } },
        comments: true,
        likes: true,
      },
    });

    if (!workouts || workouts.length === 0) {
      throw new NotFoundException(
        'No workouts found for the specified exercise.',
      );
    }

    return workouts;
  }

  async getWorkoutRecommendations() {
    const workouts = await this.prisma.workout.findMany({
      where: { user: { workoutHistoryPrivacy: PrivacySetting.public } },
      include: { user: { select: { goals: true } } },
      orderBy: {
        user: {
          goals: {
            _count: 'desc',
          },
        },
      },
    });

    if (!workouts || workouts.length === 0)
      throw new NotFoundException('No workout history found for the friends.');

    return workouts;
  }

  async getFriendsWorkoutHistory(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        friendsReceive: { select: { id: true } },
        friendsSent: { select: { id: true } },
      },
    });

    const friendsId = user.friendsSent.map((friend) => friend.id);
    user.friendsReceive.map((friend) => friendsId.push(friend.id));

    const workouts = await this.prisma.workout.findMany({
      where: {
        userId: {
          in: friendsId,
        },
        user: {
          workoutHistoryPrivacy: PrivacySetting.public,
        },
      },
      include: {
        exercise: true,
        user: { select: { password: false } },
        comments: true,
        likes: true,
      },
    });

    if (!workouts || workouts.length === 0)
      throw new NotFoundException('No workout history found for the friends.');

    return workouts;
  }

  async getStatistics(userId: number) {
    const totalWorkouts = await this.prisma.workout.count({
      where: { userId },
    });

    return totalWorkouts;
  }

  async getWorkoutRoutine(id: number) {
    return this.prisma.workout.findUnique({
      where: { id },
    });
  }
  async logWorkout(userId: number, logWorkoutInput: LogWorkoutInput) {
    return this.prisma.workoutLog.create({
      data: {
        weight: logWorkoutInput.weight,
        exercise: {
          connect: { id: logWorkoutInput.exerciseId },
        },
        sets: logWorkoutInput.sets,
        reps: logWorkoutInput.reps,
        date: logWorkoutInput.date,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async getWorkoutsByDate(userId: number, date: Date) {
    const workouts = await this.prisma.workout.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          lte: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1,
          ),
        },
      },
      include: {
        exercise: true,
        user: { select: { password: false } },
        comments: true,
        likes: true,
      },
    });

    if (!workouts || workouts.length === 0)
      throw new NotFoundException('No workouts found for the specified date.');

    return workouts;
  }
  getPopularWorkouts() {
    return this.prisma.workout.findMany({
      where: {
        user: {
          workoutHistoryPrivacy: PrivacySetting.public,
        },
      },
      orderBy: {
        numberOfLikes: 'desc',
      },
      include: {
        comments: true,
        likes: true,
        user: true,
      },
    });
  }

  async deleteWorkoutComment(userId: number, commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: { workout: true },
    });

    if (comment.userId !== userId || comment.workout.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return this.prisma.comment.delete({ where: { id: commentId } });
  }

  async likeWorkout(userId: number, workoutId: number) {
    const likeExists = await this.checkLikeExists(userId, workoutId);

    if (likeExists) return this.unLike(userId, workoutId);

    return this.like(userId, workoutId);
  }

  private async unLike(userId: number, workoutId: number) {
    return this.prisma.$transaction(async (ctx) => {
      await ctx.like.deleteMany({
        where: {
          userId,
          workoutId,
        },
      });

      return ctx.workout.update({
        where: { id: workoutId },
        data: {
          numberOfLikes: { decrement: 1 },
        },
      });
    });
  }

  private async like(userId: number, workoutId: number) {
    return this.prisma.$transaction(async (ctx) => {
      await ctx.like.create({
        data: {
          user: {
            connect: { id: userId },
          },
          workout: {
            connect: { id: workoutId },
          },
        },
      });

      return ctx.workout.update({
        where: { id: workoutId },
        data: {
          numberOfLikes: { increment: 1 },
        },
      });
    });
  }

  private async checkLikeExists(userId: number, workoutId: number) {
    const like = await this.prisma.like.findFirst({
      where: {
        userId,
        workoutId,
      },
    });

    if (!like) return false;

    return like;
  }

  async commentOnWorkout(
    userId: number,
    createCommentInput: CreateCommentInput,
  ) {
    await this.prisma.comment.create({
      data: {
        user: {
          connect: { id: userId },
        },
        workout: {
          connect: { id: createCommentInput.workoutId },
        },
        text: createCommentInput.text,
      },
    });

    return this.prisma.workout.findUnique({
      where: { id: createCommentInput.workoutId },
      include: { user: true, comments: true, likes: true },
    });
  }

  create(userId: number, createWorkoutInput: CreateWorkoutInput) {
    return this.prisma.workout.create({
      data: {
        user: {
          connect: { id: userId },
        },
        name: createWorkoutInput.name,
      },
      include: { user: true },
    });
  }

  findAll() {
    return this.prisma.workout.findMany({
      include: {
        exercise: true,
        comments: true,
        likes: true,
      },
    });
  }

  findOne(id: number) {
    const workout = this.prisma.workout.findUnique({
      where: { id },
      include: {
        exercise: true,
        user: { select: { password: false } },
        comments: true,
        likes: true,
      },
    });

    if (!workout) throw new BadRequestException('workout not found!');

    return workout;
  }

  async update(userId: number, updateWorkoutInput: UpdateWorkoutInput) {
    const workout = await this.prisma.workout.findFirst({
      where: { id: updateWorkoutInput.workoutId },
    });

    if (!workout) throw new NotFoundException('workout not found');
    if (workout.userId !== userId)
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );

    return this.prisma.workout.update({
      where: { id: workout.id },
      data: {
        name: updateWorkoutInput.name,
      },
      include: { user: true },
    });
  }

  async search(name: string, date: Date) {
    if (date && isDateString(date)) {
      return this.prisma.workout.findMany({
        where: {
          name: {
            contains: name,
          },
          createdAt: {
            gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            lte: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() + 1,
            ),
          },
        },
      });
    }

    return this.prisma.workout.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async remove(userId: number, workoutId: number) {
    const workout = await this.prisma.workout.findUnique({
      where: { id: workoutId },
    });

    if (!workout) throw new BadRequestException('workout not found');
    if (workout.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return this.prisma.workout.delete({
      where: { id: workoutId },
    });
  }
}
