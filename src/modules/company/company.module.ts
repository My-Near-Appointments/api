import { Module } from '@nestjs/common';
import { CompanyController } from 'src/modules/company/controllers/company.controller';
import { CompanyProviders } from 'src/modules/company/providers/company.providers';
import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [...CompanyProviders],
  controllers: [CompanyController],
  providers: [PrismaService, ...CompanyProviders],
})
export class CompanyModule {}
