import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { UserValidationResponseDto } from 'src/modules/user/dtos/user-validation-response.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { IUserRepository } from 'src/modules/user/repositories/user.repository.interface';

@Injectable()
export class UserRepositoryFake implements IUserRepository {
  user: User[] = [];

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

    this.user.push(mockedData);

    return UserMapper.toResponse(this.user[this.user.length - 1]);
  }

  findByUsername(username: string): Promise<UserValidationResponseDto> {
    const user = this.user.find(
      (user_record) => user_record.username === username,
    );

    return Promise.resolve(UserMapper.toValidationResponse(user));
  }

  findById(id: number): Promise<UserResponseDto> {
    const user = this.user.find((user_record) => user_record.id === id);

    return Promise.resolve(UserMapper.toResponse(user));
  }
}
