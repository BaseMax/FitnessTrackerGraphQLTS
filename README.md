# Fitness Tracker App - GraphQL-based Webservice TS

This project is a fitness tracker app developed as a GraphQL-based webservice using TypeScript and NestJS. The app allows users to log their workouts, track their fitness progress, and set fitness goals. Users can create custom workout routines, record exercise details, and view their workout history to monitor their fitness journey effectively.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts. Authentication is required to access certain features and user-specific data.
- **Workout Logging**: Users can log their workouts, including exercises performed, sets, reps, and weights.
- **Workout Routines**: Users can create custom workout routines with a combination of exercises.
- **Fitness Goals**: Users can set fitness goals, such as weight loss, muscle gain, or specific performance targets.
- **Workout History**: Users can view their workout history to track their progress over time.
- **Statistics & Insights**: The app provides insights and statistics on users' fitness activities and progress.
- **Social Features**: Users can follow and be followed by other fitness enthusiasts, view their friends' workout activities, and motivate each other.

## Tech Stack

The project will be developed using the following technologies:

- TypeScript: The primary programming language for the backend and frontend (if applicable).
- NestJS: A Node.js framework for building scalable and efficient server-side applications.
- GraphQL: A query language for APIs, allowing clients to request exactly the data they need.
- Prisma: Next-generation Node.js and TypeScript ORM
- PostgreSQL: A powerful open-source relational database.
- JWT Authentication: JSON Web Tokens for user authentication and authorization.

## Getting Started

To run this project locally, follow these steps:

**Clone the repository:**

```
git clone https://github.com/BaseMax/FitnessTrackerGraphQLTS.git
cd FitnessTrackerGraphQLTS
```

**Install dependencies:**

```
npm install
```

**Set up the database:**

Make sure you have PostgreSQL installed and running. Create a new database for the project and update the database configuration in the .env file.

**Set environment variables:**

Create a `.env` file based on the `.env.example` file and set the required environment variables.

**Build and run the project:**

```
npm run build
npm run start
```

**Access the GraphQL playground:**

The GraphQL playground will be accessible at `http://localhost:<PORT>/graphql`, where `<PORT>` is the port specified in your .env file or the default port.

## GraphQL

### Queries:

- `getUserProfile`: Get the details of the authenticated user's profile.
- `getUserWorkoutHistory`: Get the workout history of the authenticated user.
- `getWorkoutRoutine`: Get details of a specific workout routine by ID.
- `getAllWorkoutRoutines`: Get a list of all workout routines available in the system.
- `getFitnessGoals`: Get the fitness goals of the authenticated user.
- `getStatistics`: Get statistics and insights on the user's fitness activities and progress.
- `getFriends`: Get a list of the user's friends.
- `getPopularWorkouts`: Get a list of popular workouts based on the number of likes and comments.
- `getRecommendedWorkoutRoutines`: Get workout routines recommended for the user based on their fitness goals and preferences.
- `getLeaderboard`: Get a leaderboard of top users based on various fitness achievements (e.g., total workout time, weight lifted, etc.).
- `getExerciseDetails`: Get details of a specific exercise by ID.
- `getExerciseByName`: Get details of an exercise by its name.
- `getWorkoutDetails`: Get details of a specific workout by ID.
- `getWorkoutsByDate`: Get a list of workouts logged by the user on a specific date.
- `getWorkoutsByExercise`: Get a list of workouts that include a specific exercise.
- `getWorkoutsByRoutine`: Get a list of workouts performed as part of a specific routine.
- `getFriendsWorkoutHistory`: Get the workout history of the user's friends.
- `getWorkoutRecommendations`: Get workout recommendations based on the user's fitness goals and preferences.
- `getExerciseCategories`: Get a list of exercise categories for better organization.

### Mutations

- `signUp`: Register a new user.
- `logIn`: Log in an existing user.
- `logOut`: Log out the authenticated user.
- `updateProfile`: Update the user's profile details.
- `createWorkoutRoutine`: Create a new workout routine.
- `updateWorkoutRoutine`: Update an existing workout routine.
- `deleteWorkoutRoutine`: Delete a workout routine.
- `logWorkout`: Log a workout session with exercise details (sets, reps, weights).
- `setFitnessGoals`: Set fitness goals for the authenticated user.
- `followUser`: Follow another user.
- `unfollowUser`: Unfollow a user.
- `submitFeedback`: Submit feedback to the administrators.
- `deleteAccount`: Delete the authenticated user's account (requires password confirmation).
- `createExercise`: Create a new exercise to be used in workout routines.
- `updateExercise`: Update an existing exercise's details.
- `deleteExercise`: Delete an exercise from the system.
- `logWeight`: Log the user's weight on a specific date for progress tracking.
- `createExerciseCategory`: Create a new category to group exercises.
- `updateExerciseCategory`: Update an existing exercise category's details.
- `deleteExerciseCategory`: Delete an exercise category from the system.
- `likeWorkout`: Like a workout posted by another user.
- `commentOnWorkout`: Add a comment to a workout posted by another user.
- `deleteWorkoutComment`: Delete a comment made on a workout.
- `createWorkoutPost`: Create a post about a workout with additional details or notes.
- `updateWorkoutPost`: Update an existing workout post's details.
- `deleteWorkoutPost`: Delete a workout post.
- `searchUsers`: Search for users based on their usernames or other criteria.
- `searchWorkouts`: Search for workouts based on various filters (e.g., date, exercise, routine).
- `createWorkoutPostComment`: Add a comment to a workout post made by another user.
- `likeWorkoutPost`: Like a workout post made by another user.
- `createExerciseReview`: Allow users to review an exercise based on their experience.
- `updateExerciseReview`: Update an existing exercise review.
- `deleteExerciseReview`: Delete an exercise review.
- `createFriendRequest`: Send a friend request to another user.
- `acceptFriendRequest`: Accept a friend request from another user.
- `rejectFriendRequest`: Reject a friend request from another user.
- `removeFriend`: Remove a user from the friend list.
- `changePrivacySettings`: Allow users to manage their privacy settings for workout history and fitness goals.

## Project Structure

The project structure will be organized as follows:

```
FitnessTrackerGraphQLTS/
|-- src/
|   |-- main.ts
|   |-- modules/
|   |   |-- auth/
|   |   |-- user/
|   |   |-- workout/
|   |   |-- ...
|   |-- common/
|   |   |-- dto/
|   |   |-- guards/
|   |   |-- ...
|   |-- database/
|   |   |-- entities/
|   |   |-- migrations/
|   |   |-- ...
|-- test/
|-- ...
```

## API Documentation

The API documentation and schema can be accessed using the GraphQL playground at http://localhost:<PORT>/graphql. The playground provides interactive exploration of the available queries, mutations, and types.

## Contributing

We welcome contributions to improve and enhance this fitness tracker app. To contribute, follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes and push them to your fork.
- Create a pull request to the main branch of the original repository.
- Wait for code review and address any feedback.

## License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.


## Acknowledgments

The open-source community for their contributions to the technologies used in this project.

## Contact

If you have any questions or need further assistance, you can contact the project maintainers.

Feel free to open an issue or submit a pull request! Happy coding and stay fit!

Copyright 2023, Max Base
