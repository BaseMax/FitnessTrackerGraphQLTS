import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostCommentInput } from './dto/create-post-comment.input';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createPostInput: CreatePostInput) {
    await this.checkWorkoutAndAccess(userId, createPostInput.workoutId);

    return this.prisma.post.create({
      data: {
        text: createPostInput.text,
        image: createPostInput?.image,
        workout: {
          connect: { id: createPostInput.workoutId },
        },
      },
      include: { workout: true },
    });
  }

  async createComment(userId: number, payload: CreatePostCommentInput) {
    const post = await this.prisma.post.findUnique({
      where: { id: payload.postId },
    });

    if (!post) throw new NotFoundException('Post not found!');

    return this.prisma.postComments.create({
      data: {
        text: payload.text,
        post: {
          connect: { id: payload.postId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async like(userId: number, id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) throw new NotFoundException('Post not found!');

    const likeExists = await this.checkLikeExists(userId, post.id);

    if (likeExists) return this.disLikePost(userId, post.id);

    return this.likePost(userId, post.id);
  }

  private async likePost(userId: number, postId: number) {
    return this.prisma.$transaction(async (ctx) => {
      await ctx.postLikes.create({
        data: {
          user: {
            connect: { id: userId },
          },
          post: {
            connect: { id: postId },
          },
        },
      });

      return ctx.post.update({
        where: { id: postId },
        data: {
          numberOfLikes: { increment: 1 },
        },
      });
    });
  }
  private async disLikePost(userId: number, postId: number) {
    return this.prisma.$transaction(async (ctx) => {
      await ctx.postLikes.deleteMany({
        where: {
          userId,
          postId,
        },
      });

      return ctx.post.update({
        where: { id: postId },
        data: {
          numberOfLikes: { decrement: 1 },
        },
      });
    });
  }

  private async checkLikeExists(
    userId: number,
    postId: number,
  ): Promise<boolean> {
    const like = await this.prisma.postLikes.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (like) return true;

    return false;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(userId: number, updatePostInput: UpdatePostInput) {
    const post = await this.prisma.post.findUnique({
      where: { id: updatePostInput.id },
    });

    if (!post) throw new NotFoundException('post not found!');

    await this.checkWorkoutAndAccess(userId, post.workoutId);

    return this.prisma.post.update({
      where: { id: post.id },
      data: { ...updatePostInput },
    });
  }

  async remove(userId: number, id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) throw new NotFoundException('post not found!');

    await this.checkWorkoutAndAccess(userId, post.workoutId);

    return this.prisma.post.delete({ where: { id } });
  }

  private async checkWorkoutAndAccess(userId: number, workoutId: number) {
    const workout = await this.prisma.workout.findFirst({
      where: {
        id: workoutId,
      },
    });

    if (!workout) throw new NotFoundException('workout not found!');
    if (workout.userId !== userId)
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
  }
}
