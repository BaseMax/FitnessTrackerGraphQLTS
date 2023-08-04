import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Workout } from '../../workout/entities/workout.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { Comment } from '../../workout/entities/comment.entity';
import { Like } from '../../workout/entities/like.entity';
import { Profile } from './profile.entity';
import { Goal } from '../../goals/entities/goal.entity';
import { PrivacySetting } from './privacy.enum';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  username: string;

  @Field(() => Int)
  followersCount: number;

  @Field(() => [Workout], { nullable: true })
  workouts: Workout[];

  @Field(() => [Feedback], { nullable: true })
  feedbacks: Feedback[];

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @Field(() => [Like], { nullable: 'items' })
  likes: Like[];

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => [Goal], { nullable: true })
  goal: [Goal];

  @Field(() => PrivacySetting)
  workoutHistoryPrivacy: PrivacySetting;

  @Field(() => PrivacySetting)
  fitnessGoalsPrivacy: PrivacySetting;
}

registerEnumType(PrivacySetting, {
  name: 'PrivacySetting',
  description: 'Privacy settings for workout history and fitness goals',
});
