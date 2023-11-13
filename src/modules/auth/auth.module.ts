import { Module } from '@nestjs/common';
import { AuthUseCase } from './usecases/auth.use-case';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { FindUserUseCase } from 'src/modules/user/usecases/find-user.use-case';
import { UserProviders } from 'src/modules/user/providers/user.providers';
import { PrismaService } from 'src/prisma.service';
import { ValidateUserUseCase } from 'src/modules/user/usecases/validate-user.use-case';
@Module({
  providers: [
    AuthUseCase,
    FindUserUseCase,
    PrismaService,
    ValidateUserUseCase,
    ...UserProviders,
  ],
  controllers: [AuthController],
  exports: [FindUserUseCase, ...UserProviders],
})
export class AuthModule {}
