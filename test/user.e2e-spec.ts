import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { HashService } from '../src/modules/auth/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../src/modules/auth/types/jwt.payload';

describe('user (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let hashService: HashService;
  let jwtService: JwtService;
  let token;

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

    const userData = {
      username: 'test',
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
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  it('search users', async () => {
    const username = 't';
    const mutation = `mutation {
      searchUsers(username: "${username}") {
        id
        username
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: mutation });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(Array.isArray(data.searchUsers)).toBe(true);
  });

  it('update profile', async () => {
    const input = {
      firstName: 'john',
      lastName: 'Doe',
      weight: 80,
      height: 182,
      bio: 'im a engineer',
    };

    const mutation = `mutation {
        updateProfile(updateProfileInput:{
        firstName: "${input.firstName}"
        lastName: "${input.lastName}"
        weight: ${input.weight}
        height: ${input.height}
        bio: "${input.bio}"
      }) {
        id
        lastName
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query: mutation });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(data.updateProfile?.id).toBeDefined();
    expect(data.updateProfile?.lastName).toBe(input.lastName);
  });

  it('get user profile', async () => {
    const query = `query {
        getUserProfile {
        id
        firstName
        lastName
        weight
        height
        bio
        createdAt
        updatedAt
        user {
            username
        }
      }
    }`;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${token}` })
      .send({ query });

    expect(response.status).toBe(200);

    const { data } = response.body;
    expect(data.getUserProfile?.firstName).toBeDefined();
    expect(data.getUserProfile?.lastName).toBeDefined();
  });
});
