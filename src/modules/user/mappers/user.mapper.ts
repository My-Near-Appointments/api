import { User } from '@prisma/client';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { UserValidationResponseDto } from 'src/modules/user/dtos/user-validation-response.dto';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: '',
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toValidationResponse(user: User): UserValidationResponseDto {
    return {
      id: user.id,
      name: '',
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
