import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { HashService } from '../src/modules/auth/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../src/modules/auth/types/jwt.payload';

describe('exercise (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let hashService: HashService;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    hashService = app.get(HashService);
    jwtService = app.get(JwtService);

    await app.init();
  });
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.workout.deleteMany();
    await prisma.exerciseCategory.deleteMany();
    await prisma.exercise.deleteMany();

    const user = await prisma.user.create({
      data: {
        username: 'wUser',
        password: await hashService.hash('12345678'),
      },
    });

    const payload: JwtPayload = {
      id: user.id,
      username: user.role,
      role: user.role,
    };

    token = jwtService.sign(payload);

    const workout = await prisma.workout.create({
      data: {
        name: 'workoutTest',
        userId: user.id,
      },
    });

    await prisma.exercise.create({
      data: {
        name: 'testExercise',
        sets: 10,
        reps: 15,
        weight: 65,
        workout: {
          connect: { id: workout.id },
        },
        category: {
          create: {
            name: 'test category',
          },
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.user.deleteMany();
    await prisma.exerciseCategory.deleteMany();
    await prisma.exercise.deleteMany();

    await app.close();
  });

  it('get exercise by name', async () => {
    const name = 'testExercise';

    const query = `query {
        getExerciseByName(name: "${name}") {
          id
          name
          weight
          sets
          reps
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(data.getExerciseByName).toBeDefined();
  });
});
