import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendResolver } from './friend.resolver';

@Module({
  providers: [FriendResolver, FriendService]
})
export class FriendModule {}
