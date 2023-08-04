import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { HashService } from '../src/modules/auth/services/hash.service';

describe('auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let hashService: HashService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    hashService = app.get(HashService);

    await app.init();
  });

  beforeAll(async () => {
    await prisma.user.deleteMany();

    const userData = {
      username: 'testiz',
      password: '123456789',
    };

    const hashedPassword = await hashService.hash(userData.password);

    await prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();

    await app.close();
  });

  it('register', async () => {
    const input = {
      username: 'mauser',
      password: '123456789',
    };

    const mutation = `mutation {
        register(registerInput:{
            username: "${input.username}"
            password: "${input.password}"
        }) {
            access_token
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(data.register.access_token).toBeDefined();
  });

  it('login', async () => {
    const input = {
      username: 'testiz',
      password: '123456789',
    };

    const mutation = `mutation {
        logIn(loginInput:{
            username: "${input.username}"
            password: "${input.password}"
        }) {
          access_token
        }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(data.logIn?.access_token).toBeDefined();
  });
});
