import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../auth/services/hash.service';
import { UpdateProfileInput } from './dto/update-profile';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async updateProfile(userId: number, updateProfileInput: UpdateProfileInput) {
    await this.prisma.profile.upsert({
      where: { userId },
      create: {
        firstName: updateProfileInput?.firstName,
        lastName: updateProfileInput?.lastName,
        weight: updateProfileInput?.weight,
        height: updateProfileInput?.height,
        image: updateProfileInput?.image,
        bio: updateProfileInput?.bio,
        user: {
          connect: { id: userId },
        },
      },
      update: {
        firstName: updateProfileInput?.firstName,
        lastName: updateProfileInput?.lastName,
        weight: updateProfileInput?.weight,
        height: updateProfileInput?.height,
        image: updateProfileInput?.image,
        bio: updateProfileInput?.bio,
      },
    });

    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }

  getUserProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }

  getFollowersList(userId: number) {
    return this.prisma.user.findFirst({
      where: { id: userId },
      include: { followers: true },
    });
  }

  getFollowingsList(userId: number) {
    return this.prisma.user.findFirst({
      where: { id: userId },
      include: { followings: true },
    });
  }

  async followUser(userId: number, followingId: number) {
    const followExist = await this.prisma.follow.findFirst({
      where: {
        followingId: userId,
        followerId: followingId,
      },
    });

    if (followExist)
      throw new BadRequestException('you already followed this user');

    return this.prisma.$transaction(async (context) => {
      await context.follow.create({
        data: {
          follower: { connect: { id: followingId } },
          following: { connect: { id: userId } },
        },
      });

      return context.user.update({
        where: { id: followingId },
        data: {
          followersCount: { increment: 1 },
        },
      });
    });
  }

  async unfollowUser(userId: number, followingId: number) {
    const followExist = await this.prisma.follow.findFirst({
      where: {
        followingId: userId,
        followerId: followingId,
      },
    });

    if (!followExist)
      throw new BadRequestException('You have not followed this user');

    return this.prisma.$transaction(async (context) => {
      await context.follow.deleteMany({
        where: {
          followerId: followingId,
          followingId: userId,
        },
      });

      return context.user.update({
        where: { id: followingId },
        data: { followersCount: { decrement: 1 } },
      });
    });
  }

  searchUsers(username: string) {
    return this.prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      select: {
        password: false,
      },
    });
  }

  findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        username: createUserInput.username,
        password: createUserInput.password,
      },
    });
  }

  async deleteAccount(id: number, password: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    const passwordMatch = await this.hashService.compare(
      password,
      user.password,
    );
    if (!passwordMatch) throw new BadRequestException('password not valid!');

    return this.prisma.user.delete({
      where: { id },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
