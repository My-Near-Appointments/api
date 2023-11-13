import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { UserValidationResponseDto } from 'src/modules/user/dtos/user-validation-response.dto';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserResponseDto>;
  findByUsername(username: string): Promise<UserValidationResponseDto>;
  findById(id: number): Promise<UserResponseDto>;
}
