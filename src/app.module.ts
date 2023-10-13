import { Module } from '@nestjs/common';
import { CompanyModule } from 'src/modules/company/company.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [CompanyModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
