import { Module } from '@nestjs/common';
import { CompanyController } from 'src/modules/company/controllers/company.controller';
import { CompanyProviders } from 'src/modules/company/providers/company.providers';
import { CreateCompanyUseCase } from 'src/modules/company/usecases/create-company.use-case';
import { ListCompanyUseCase } from 'src/modules/company/usecases/list-company.usecase';
import { ToggleStatusUseCase } from 'src/modules/company/usecases/toggle-status.use-case';
import { UpdateCompanyUseCase } from 'src/modules/company/usecases/update-company.use-case';

import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [...CompanyProviders],
  controllers: [CompanyController],
  providers: [
    PrismaService,
    ...CompanyProviders,
    CreateCompanyUseCase,
    ListCompanyUseCase,
    UpdateCompanyUseCase,
    ToggleStatusUseCase,
  ],
})
export class CompanyModule {}
