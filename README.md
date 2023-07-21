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
- TypeORM: An Object-Relational Mapping (ORM) library for TypeScript that simplifies database operations.
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
