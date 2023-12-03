import { User } from '@prisma/client';
import { UserCreatedResponseDto } from 'src/modules/user/dtos/user-created-response.dto';
import { UserInternalResponseDto } from 'src/modules/user/dtos/user-internal-response.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { UserValidationResponseDto } from 'src/modules/user/dtos/user-validation-response.dto';

export class UserMapper {
  static toUserCreatedResponse(user: User): UserCreatedResponseDto {
    return {
      id: user.id,
    };
  }

  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: '',
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toInternalResponse(user: User): UserInternalResponseDto {
    return {
      id: user.id,
      name: '',
      role: user.role,
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
