import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthUseCase } from 'src/modules/auth/usecases/auth.use-case';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { ValidateUserUseCase } from 'src/modules/user/usecases/validate-user.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly validateUseCase: ValidateUserUseCase,
    private readonly authUseCase: AuthUseCase,
  ) {}

  @ApiTags('auth')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Token successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
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
