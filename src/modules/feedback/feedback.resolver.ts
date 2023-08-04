import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeedbackService } from './feedback.service';
import { Feedback } from './entities/feedback.entity';
import { GetCurrentUserId, Roles } from '../../common/decorators';
import { Role } from '@prisma/client';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Roles(Role.admin)
  @Query(() => [Feedback])
  getAllFeedbacks() {
    return this.feedbackService.findAll();
  }

  @Mutation(() => Feedback)
  submitFeedback(
    @GetCurrentUserId() userId: number,
    @Args('text') text: string,
  ) {
    return this.feedbackService.submitFeedback(+userId, text);
  }
}
