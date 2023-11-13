import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserValidationResponseDto } from 'src/modules/user/dtos/user-validation-response.dto';

@Injectable()
export class AuthUseCase {
  constructor(private readonly jwtService: JwtService) {}

  public async execute(user: UserValidationResponseDto) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
