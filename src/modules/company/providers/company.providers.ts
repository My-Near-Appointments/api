import { CompanyRepository } from 'src/modules/company/infra/repositories/company.repository';

export const CompanyProviders = [
  {
    provide: 'ICompanyRepository',
    useClass: CompanyRepository,
  },
];
