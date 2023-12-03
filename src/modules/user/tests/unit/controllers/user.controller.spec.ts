import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserRepositoryFake } from 'src/modules/user/repositories/fakes/user.repository.fake';
import { CreateUserUseCase } from 'src/modules/user/usecases/create-user.use-case';

describe('#Unit - UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        { provide: 'IUserRepository', useClass: UserRepositoryFake },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('createUser', () => {
    it('should be able to create a user', async () => {
      const mockedUser: CreateUserDto = {
        username: 'Test User',
        name: 'Test Name',
        email: 'test@test.com',
        password: 'TestPassword123',
        userRole: 'Customer',
      };

      const result = await userController.createUser(mockedUser);

      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('id');
      expect(result.message).toBe('Usuário criado com sucesso');
    });
  });
});
