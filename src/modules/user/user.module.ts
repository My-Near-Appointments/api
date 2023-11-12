import { Module } from '@nestjs/common';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserProviders } from 'src/modules/user/providers/user.providers';
import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [...UserProviders],
  controllers: [UserController],
  providers: [PrismaService, ...UserProviders],
})
export class UserModule {}
