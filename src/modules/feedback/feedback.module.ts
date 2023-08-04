import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackResolver } from './feedback.resolver';

@Module({
  providers: [FeedbackResolver, FeedbackService]
})
export class FeedbackModule {}
