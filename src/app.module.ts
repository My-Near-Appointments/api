import { Module } from '@nestjs/common';
import { CompanyModule } from 'src/modules/company/company.module';
import { UserModule } from 'src/modules/user/user.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [CompanyModule, UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
