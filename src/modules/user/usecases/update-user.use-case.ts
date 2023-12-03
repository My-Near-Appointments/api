import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/modules/user/dtos/update-user.dto';
import { IUserRepository } from 'src/modules/user/repositories/user.repository.interface';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(id: string, updateUser: UpdateUserDto) {
    return this.userRepository.update(id, updateUser);
  }
}
