import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dtos/update-user.dto';
import { UserCreatedResponseDto } from 'src/modules/user/dtos/user-created-response.dto';
import { UserInternalResponseDto } from 'src/modules/user/dtos/user-internal-response.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { UserValidationResponseDto } from 'src/modules/user/dtos/user-validation-response.dto';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserCreatedResponseDto>;
  update(id: string, data: UpdateUserDto): Promise<UserResponseDto>;
  findByUsername(username: string): Promise<UserValidationResponseDto>;
  findForInternal(id: string): Promise<UserInternalResponseDto>;
  findById(id: string): Promise<UserResponseDto>;
}
