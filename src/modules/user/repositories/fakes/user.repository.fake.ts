import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dtos/update-user.dto';
import { UserCreatedResponseDto } from 'src/modules/user/dtos/user-created-response.dto';
import { UserInternalResponseDto } from 'src/modules/user/dtos/user-internal-response.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { UserValidationResponseDto } from 'src/modules/user/dtos/user-validation-response.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { IUserRepository } from 'src/modules/user/repositories/user.repository.interface';

@Injectable()
export class UserRepositoryFake implements IUserRepository {
  user: User[] = [];

  async create(data: CreateUserDto): Promise<UserCreatedResponseDto> {
    const mockedData: User = {
      id: crypto.randomUUID(),
      username: data.username,
      password: data.password,
      companyId: crypto.randomUUID(),
      role: 'Customer',
      email: data.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.user.push(mockedData);

    return UserMapper.toUserCreatedResponse(this.user[this.user.length - 1]);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    const userIndex = this.user.findIndex((user) => user.id === id);

    this.user[userIndex] = {
      ...this.user[userIndex],
      ...data,
    };

    return UserMapper.toResponse(this.user[userIndex]);
  }

  findByUsername(username: string): Promise<UserValidationResponseDto> {
    const user = this.user.find(
      (user_record) => user_record.username === username,
    );

    return Promise.resolve(UserMapper.toValidationResponse(user));
  }

  findById(id: string): Promise<UserResponseDto> {
    const user = this.user.find((user_record) => user_record.id === id);

    return Promise.resolve(UserMapper.toResponse(user));
  }

  findForInternal(id: string): Promise<UserInternalResponseDto> {
    const user = this.user.find((user_record) => user_record.id === id);

    return Promise.resolve(UserMapper.toInternalResponse(user));
  }
}
