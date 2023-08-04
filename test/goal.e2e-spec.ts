import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { HashService } from '../src/modules/auth/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../src/modules/auth/types/jwt.payload';

describe('goal (e2e)', () => {
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
    await prisma.fitnessGoal.deleteMany();

    const userData = {
      username: 'test2',
      password: '123456789',
    };

    const hashedPassword = await hashService.hash(userData.password);

    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
      },
    });

    const payload: JwtPayload = {
      id: user.id,
      username: user.role,
      role: user.role,
    };

    token = jwtService.sign(payload);

    await prisma.fitnessGoal.create({
      data: {
        name: 'my goal',
        target: 'my target',
        type: 'less weight',
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.fitnessGoal.deleteMany();

    await app.close();
  });

  it('create fitness goals', async () => {
    const input = {
      name: 'test',
      type: 'test',
      target: 'test',
    };

    const mutation = `mutation {
        setFitnessGoals(createGoalInput:{
          name: "${input.name}"
          type: "${input.type}"
          target: "${input.target}"
        }) {
          id
          name
          type
          target
          user {
            id
            username
          }
          createdAt
          updatedAt
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query: mutation });

    expect(response.status).toBe(200);

    const { data } = response.body;

    expect(data.setFitnessGoals?.id).toBeDefined();
    expect(data.setFitnessGoals?.name).toBe(input.name);
  });

  it('get all fitness goals', async () => {
    const query = `query  {
        getFitnessGoals {
            id
            name
            type
            target
            user {
                id
                username
            }
            createdAt
            updatedAt
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(Array.isArray(data.getFitnessGoals)).toBe(true);
  });
});
