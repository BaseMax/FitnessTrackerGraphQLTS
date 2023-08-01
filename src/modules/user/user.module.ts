import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { HashService } from '../auth/services/hash.service';

@Module({
  providers: [UserResolver, UserService, HashService],
  exports: [UserService],
})
export class UserModule {}
