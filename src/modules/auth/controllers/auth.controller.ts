import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthUseCase } from 'src/modules/auth/usecases/auth.use-case';
import { ValidateUserUseCase } from 'src/modules/user/usecases/validate-user.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly validateUseCase: ValidateUserUseCase,
    private readonly authUseCase: AuthUseCase,
  ) {}

  @Post('v1/login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.validateUseCase.execute(
      body.username,
      body.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authUseCase.execute(user);
  }
}
