import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.feedback.findMany({
      include: { user: true },
    });
  }

  submitFeedback(userId: number, text: string) {
    return this.prisma.feedback.create({
      data: {
        text,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: { user: true },
    });
  }
}
