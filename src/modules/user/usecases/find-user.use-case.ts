import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/modules/user/repositories/user.repository.interface';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(id: number) {
    const user = await this.userRepository.findById(id);

    return user;
  }
}
