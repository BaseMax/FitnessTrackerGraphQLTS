import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { HashService } from './services/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService, HashService, JwtStrategy],
})
export class AuthModule {}
