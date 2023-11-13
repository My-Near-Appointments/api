import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/modules/user/repositories/user.repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

    if (user && bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }
}
