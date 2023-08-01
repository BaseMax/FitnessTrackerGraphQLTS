import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginInput } from '../dto/login.input';
import { RegisterInput } from '../dto/register.input';
import { UserService } from '../../user/user.service';
import { HashService } from './hash.service';
import { JwtPayload } from '../types/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(payload: LoginInput) {
    const user = await this.userService.findUserByUsername(payload.username);

    if (!user) throw new BadRequestException('Username not found!');

    const passwordMatch = await this.hashService.compare(
      payload.password,
      user.password,
    );
    if (!passwordMatch) throw new BadRequestException('credentials not valid');

    const token = this.getToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return { access_token: token };
  }

  async register(payload: RegisterInput) {
    const user = await this.userService.findUserByUsername(payload.username);

    if (user) throw new BadRequestException('Username Already Exists!');

    const hashPassword = await this.hashService.hash(payload.password);

    const newUser = await this.userService.create({
      username: payload.username,
      password: hashPassword,
    });

    const token = this.getToken({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
    });

    return { access_token: token };
  }

  logout(id: number) {
    return `logout`;
  }

  private getToken(jwtPayload: JwtPayload): string {
    return this.jwtService.sign(jwtPayload);
  }
}
