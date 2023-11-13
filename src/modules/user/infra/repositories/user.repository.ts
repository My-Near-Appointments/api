import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { IUserRepository } from 'src/modules/user/repositories/user.repository.interface';
import { PrismaService } from 'src/prisma.service';
import { UserValidationResponseDto } from 'src/modules/user/dtos/user-validation-response.dto';

import { hash } from 'bcrypt';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        username: data.username,
      },
    });

    return UserMapper.toResponse(user);
  }

  async findById(id: number): Promise<UserResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return UserMapper.toResponse(user);
  }

  async findByUsername(
    username: string,
  ): Promise<UserValidationResponseDto> | null {
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    return UserMapper.toValidationResponse(user);
  }
}