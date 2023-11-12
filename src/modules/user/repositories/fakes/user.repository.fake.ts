import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { IUserRepository } from 'src/modules/user/repositories/user.repository.interface';

@Injectable()
export class UserRepositoryFake implements IUserRepository {
  user: UserResponseDto[] = [];

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const mockedData: User = {
      id: 2,
      username: data.username,
      password: data.password,
      companyId: crypto.randomUUID(),
      email: data.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.user.push(UserMapper.toResponse(mockedData));

    return this.user[this.user.length - 1];
  }
}
