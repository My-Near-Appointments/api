import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserResponseDto>;
}
