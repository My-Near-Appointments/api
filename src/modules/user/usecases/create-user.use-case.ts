import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { IUserRepository } from 'src/modules/user/repositories/user.repository.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(createUser: CreateUserDto) {
    return this.userRepository.create(createUser);
  }
}
