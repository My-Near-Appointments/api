import { UserRepository } from 'src/modules/user/infra/repositories/user.repository';

export const UserProviders = [
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },
];
