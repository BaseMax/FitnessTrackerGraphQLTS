import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsResolver } from './goals.resolver';

@Module({
  providers: [GoalsResolver, GoalsService]
})
export class GoalsModule {}
