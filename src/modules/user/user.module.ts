import { Module } from '@nestjs/common';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserProviders } from 'src/modules/user/providers/user.providers';
import { CreateUserUseCase } from 'src/modules/user/usecases/create-user.use-case';
import { FindUserUseCase } from 'src/modules/user/usecases/find-user.use-case';
import { UpdateUserUseCase } from 'src/modules/user/usecases/update-user.use-case';
import { ValidateUserUseCase } from 'src/modules/user/usecases/validate-user.use-case';
import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [...UserProviders],
  controllers: [UserController],
  providers: [
    PrismaService,
    ...UserProviders,
    CreateUserUseCase,
    UpdateUserUseCase,
    FindUserUseCase,
    ValidateUserUseCase,
  ],
})
export class UserModule {}
