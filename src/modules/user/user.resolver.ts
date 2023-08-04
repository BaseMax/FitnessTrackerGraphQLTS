import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GetCurrentUserId, Public, Roles } from '../../common/decorators';
import { ParseIntPipe } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UpdateProfileInput } from './dto/update-profile';
import { Profile } from './entities/profile.entity';
import { ChangePrivacyInput } from './dto/change-privacy.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.admin)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Public()
  @Query(() => [User])
  getLeaderboard() {
    return this.userService.getLeaderboard();
  }

  @Query(() => Profile)
  getUserProfile(@GetCurrentUserId() userId: number) {
    return this.userService.getUserProfile(+userId);
  }

  @Mutation(() => Profile)
  updateProfile(
    @GetCurrentUserId() userId: number,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.userService.updateProfile(+userId, updateProfileInput);
  }

  @Query(() => [User])
  getFollowersList(@GetCurrentUserId() userId: number) {
    return this.userService.getFollowersList(+userId);
  }

  @Query(() => [User])
  getFollowingsList(@GetCurrentUserId() userId: number) {
    return this.userService.getFollowingsList(+userId);
  }

  @Mutation(() => User)
  followUser(
    @GetCurrentUserId() userId: number,
    @Args('followingId', ParseIntPipe) followingId: number,
  ) {
    return this.userService.followUser(+userId, +followingId);
  }

  @Mutation(() => User)
  unfollowUser(
    @GetCurrentUserId() userId: number,
    @Args('followingId', ParseIntPipe) followingId: number,
  ) {
    return this.userService.unfollowUser(userId, followingId);
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  deleteAccount(
    @GetCurrentUserId() userId: number,
    @Args('password') password: string,
  ) {
    return this.userService.deleteAccount(+userId, password);
  }

  @Public()
  @Mutation(() => [User])
  searchUsers(@Args('username') username: string) {
    return this.userService.searchUsers(username);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Mutation(() => User)
  logWeight(
    @GetCurrentUserId() userId: number,
    @Args('weight', { type: () => Float }) weight: number,
  ) {
    this.userService.logWeight(userId, weight);
  }

  @Mutation(() => User)
  changePrivacySettings(
    @GetCurrentUserId() userId: number,
    @Args('changePrivacyInput') changePrivacyInput: ChangePrivacyInput,
  ) {
    return this.userService.changePrivacySettings(+userId, changePrivacyInput);
  }
}
