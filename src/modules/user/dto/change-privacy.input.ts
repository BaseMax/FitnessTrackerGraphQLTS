import { Field, InputType } from '@nestjs/graphql';
import { PrivacySetting } from '../entities/privacy.enum';

@InputType()
export class ChangePrivacyInput {
  @Field(() => PrivacySetting, { nullable: true })
  workoutHistoryPrivacy?: PrivacySetting;

  @Field(() => PrivacySetting, { nullable: true })
  fitnessGoalsPrivacy?: PrivacySetting;
}
