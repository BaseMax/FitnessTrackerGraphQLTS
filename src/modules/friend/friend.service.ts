import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestStatus } from '@prisma/client';

@Injectable()
export class FriendService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFriends(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { friendsReceive: true, friendsSent: true },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const allFriends = [...user.friendsSent, ...user.friendsReceive];
    return allFriends;
  }

  async create(userId: number, friendId: number) {
    const friendExists = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        friendsSent: { where: { id: friendId } },
        friendsReceive: { where: { id: friendId } },
      },
    });

    console.log(friendExists.friendsSent);
    console.log(friendExists.friendsReceive);

    if (friendExists.friendsSent || friendExists.friendsReceive) {
      throw new BadRequestException('He/She is your friend now');
    }

    const request = await this.prisma.request.findFirst({
      where: {
        senderId: userId,
        receiverId: friendId,
      },
    });

    if (request)
      throw new BadRequestException('You have already made a request');

    return this.prisma.request.create({
      data: {
        sender: {
          connect: { id: userId },
        },
        receiver: {
          connect: { id: friendId },
        },
        status: RequestStatus.PENDING,
      },
    });
  }

  async accept(userId: number, id: number) {
    const request = await this.prisma.request.findUnique({ where: { id } });

    if (!request) throw new NotFoundException('request not found!');
    if (request.receiverId !== userId)
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );

    return this.prisma.$transaction(async (ctx) => {
      const acceptRequest = await ctx.request.update({
        where: { id, receiverId: userId },
        data: {
          status: RequestStatus.ACCEPTED,
        },
      });

      await ctx.user.update({
        where: { id: acceptRequest.senderId },
        data: {
          friendsSent: {
            connect: { id: userId },
          },
        },
      });

      return ctx.user.update({
        where: { id: userId },
        data: {
          friendsReceive: {
            connect: { id: acceptRequest.senderId },
          },
        },
      });
    });
  }

  async reject(userId: number, id: number) {
    const request = await this.prisma.request.findUnique({ where: { id } });

    if (!request) throw new NotFoundException('request not found!');
    if (request.receiverId !== userId)
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );

    return this.prisma.request.update({
      where: { id },
      data: {
        status: RequestStatus.REJECTED,
      },
    });
  }

  async remove(userId: number, id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { friendsReceive: true, friendsSent: true },
    });

    const friendSentIndex = user.friendsSent.findIndex(
      (data) => data.id === id,
    );
    const friendReceiveIndex = user.friendsReceive.findIndex(
      (data) => data.id === id,
    );

    if (friendSentIndex !== -1) {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          friendsSent: {
            disconnect: { id },
          },
        },
      });
    } else if (friendReceiveIndex !== -1) {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          friendsReceive: {
            disconnect: { id },
          },
        },
      });
    } else {
      throw new NotFoundException('Friend not found.');
    }
  }
}
