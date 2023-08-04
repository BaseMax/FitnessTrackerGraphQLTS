import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { HashService } from '../src/modules/auth/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../src/modules/auth/types/jwt.payload';

describe('workout', () => {
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

    const user = await prisma.user.create({
      data: {
        username: 'wsUser',
        password: await hashService.hash('12345678'),
      },
    });

    const payload: JwtPayload = {
      id: user.id,
      username: user.role,
      role: user.role,
    };

    token = jwtService.sign(payload);

    await prisma.workout.createMany({
      data: [
        {
          name: 'my workout',
          userId: user.id,
        },
        {
          name: 'your workout',
          userId: user.id,
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.workout.deleteMany();
    await prisma.user.deleteMany();

    await app.close();
  });

  it('get All Workouts', async () => {
    const query = `query {
        getAllWorkoutRoutines {
          id
          name
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(Array.isArray(data.getAllWorkoutRoutines)).toBe(true);
  });

  it('get Popular Workouts', async () => {
    const query = `query {
      getPopularWorkouts {
        id
        name
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(Array.isArray(data.getPopularWorkouts)).toBe(true);
  });
});
