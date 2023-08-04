import { Injectable } from '@nestjs/common';
import { CreateGoalInput } from './dto/create-goal.input';
import { UpdateGoalInput } from './dto/update-goal.input';
import { PrismaService } from '../prisma/prisma.service';
import { PrivacySetting } from '@prisma/client';

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}
  create(userId: number, createGoalInput: CreateGoalInput) {
    return this.prisma.fitnessGoal.create({
      data: {
        name: createGoalInput.name,
        target: createGoalInput.target,
        type: createGoalInput.type,
        User: {
          connect: {
            id: userId,
          },
        },
      },
      include: { User: true },
    });
  }

  findAll(userId: number) {
    return this.prisma.fitnessGoal.findMany({
      where: { userId, User: { fitnessGoalsPrivacy: PrivacySetting.public } },
      include: { User: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} goal`;
  }

  update(id: number, updateGoalInput: UpdateGoalInput) {
    return `This action updates a #${id} goal`;
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }
}
