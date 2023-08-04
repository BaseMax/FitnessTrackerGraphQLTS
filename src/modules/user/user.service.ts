import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../auth/services/hash.service';
import { UpdateProfileInput } from './dto/update-profile';
import { ChangePrivacyInput } from './dto/change-privacy.input';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async changePrivacySettings(
    userId: number,
    changePrivacyInput: ChangePrivacyInput,
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        fitnessGoalsPrivacy: changePrivacyInput?.fitnessGoalsPrivacy,
        workoutHistoryPrivacy: changePrivacyInput?.workoutHistoryPrivacy,
      },
    });
  }

  async getLeaderboard() {
    const users = await this.prisma.user.findMany({
      include: { workoutLog: { select: { weight: true } } },
      orderBy: {
        workoutLog: {
          _count: 'desc',
        },
      },
    });

    if (!users || users.length === 0)
      throw new NotFoundException('users not found!');

    return users;
  }
  async updateProfile(userId: number, updateProfileInput: UpdateProfileInput) {
    return this.prisma.profile.upsert({
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
  }

  async logWeight(userId: number, weight: number) {
    await this.prisma.weightLog.create({
      data: {
        user: {
          connect: { id: userId },
        },
        weight,
      },
    });

    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getUserProfile(userId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!profile)
      throw new NotFoundException('Please register your profile information');

    return profile;
  }

  async getFollowersList(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { followers: { include: { following: true } } },
    });

    if (!user.followers || user.followers.length === 0)
      throw new NotFoundException('You have no followers');

    return user.followers.map((data) => data.following);
  }

  async getFollowingsList(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { followings: { include: { follower: true } } },
    });

    if (!user.followings || user.followings.length === 0)
      throw new NotFoundException('You have no followings');

    return user.followings.map((data) => data.follower);
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
