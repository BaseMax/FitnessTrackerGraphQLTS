import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { HashService } from '../src/modules/auth/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../src/modules/auth/types/jwt.payload';

describe('feedback (e2e)', () => {
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
    await prisma.feedback.deleteMany();

    const userData = {
      username: 'adminUser',
      password: '123456789',
    };

    const hashedPassword = await hashService.hash(userData.password);

    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
        role: Role.admin,
      },
    });

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    token = jwtService.sign(payload);

    await prisma.feedback.create({
      data: {
        text: 'great website',
        user: {
          connect: { id: user.id },
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.feedback.deleteMany();

    await app.close();
  });

  it('create feedback', async () => {
    const mutation = `mutation {
        submitFeedback(text: "great website") {
          id
          text
        }
      }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query: mutation });

    expect(response.status).toBe(200);

    const { data } = response.body;

    expect(data.submitFeedback?.id).toBeDefined();
  });

  it('get all feedbacks', async () => {
    const query = `query {
        getAllFeedbacks {
          id
          text
          createdAt
        }
      }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(Array.isArray(data.getAllFeedbacks)).toBe(true);
  });
});
