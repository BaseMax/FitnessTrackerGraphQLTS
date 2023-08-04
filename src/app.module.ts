import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './common/guards/at.guard';
import { RolesGuard } from './common/guards/role.guard';
import { FriendModule } from './modules/friend/friend.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { ExerciseCategoryModule } from './modules/exercise-category/exercise-category.module';
import { ExerciseReviewModule } from './modules/exercise-review/exercise-review.module';
import { GoalsModule } from './modules/goals/goals.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    FriendModule,
    FeedbackModule,
    WorkoutModule,
    ExerciseModule,
    ExerciseCategoryModule,
    ExerciseReviewModule,
    GoalsModule,
    PostModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
