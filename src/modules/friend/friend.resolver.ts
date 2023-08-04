import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FriendService } from './friend.service';
import { ParseIntPipe } from '@nestjs/common';
import { GetCurrentUserId } from '../../common/decorators';
import { User } from '../user/entities/user.entity';
import { Request } from './entities/request.entity';

@Resolver()
export class FriendResolver {
  constructor(private readonly friendService: FriendService) {}

  @Query(() => [User])
  getFriends(@GetCurrentUserId() userId: number) {
    return this.friendService.getAllFriends(+userId);
  }

  @Mutation(() => Request)
  createFriendRequest(
    @GetCurrentUserId() userId: number,
    @Args('friendId', ParseIntPipe) friendId: number,
  ) {
    return this.friendService.create(+userId, +friendId);
  }

  @Mutation(() => User)
  acceptFriendRequest(
    @GetCurrentUserId() userId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.friendService.accept(+userId, +id);
  }

  @Mutation(() => Request)
  rejectFriendRequest(
    @GetCurrentUserId() userId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.friendService.reject(+userId, +id);
  }

  @Mutation(() => User)
  removeFriend(
    @GetCurrentUserId() userId: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.friendService.remove(userId, id);
  }
}
