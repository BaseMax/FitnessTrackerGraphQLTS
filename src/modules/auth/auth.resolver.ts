import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { AuthPayload } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { Public } from '../../common/decorators';

@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthPayload)
  logIn(@Args('loginInput') payload: LoginInput) {
    return this.authService.login(payload);
  }

  @Public()
  @Mutation(() => AuthPayload)
  register(@Args('registerInput') payload: RegisterInput) {
    return this.authService.register(payload);
  }

  @Mutation(() => AuthPayload)
  logOut(@Args('id', { type: () => Int }) id: number) {
    return this.authService.logout(id);
  }
}
