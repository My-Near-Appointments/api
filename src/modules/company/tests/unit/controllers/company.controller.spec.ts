import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from 'src/modules/company/controllers/company.controller';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { CompanyRepositoryFake } from 'src/modules/company/repositories/fakes/company.repository.fake';
import { CreateCompanyUseCase } from 'src/modules/company/usecases/create-company.use-case';
import { ListCompanyUseCase } from 'src/modules/company/usecases/list-company.usecase';
import { ToggleStatusUseCase } from 'src/modules/company/usecases/toggle-status.use-case';
import { UpdateCompanyUseCase } from 'src/modules/company/usecases/update-company.use-case';
import { CompanyAdminGuardFake } from 'src/modules/shared/fakes/guards/company-role.guard';
import { CompanyAdminGuard } from 'src/modules/shared/infra/guards/company-role.guard';

describe('#Unit - CompanyController', () => {
  let companyController: CompanyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CreateCompanyUseCase,
        ListCompanyUseCase,
        UpdateCompanyUseCase,
        ToggleStatusUseCase,
        { provide: 'ICompanyRepository', useClass: CompanyRepositoryFake },
      ],
    })
      .overrideGuard(CompanyAdminGuard)
      .useClass(CompanyAdminGuardFake)
      .compile();

    companyController = app.get<CompanyController>(CompanyController);
  });

  describe('createCompany', () => {
    it('should be able to create a company', async () => {
      const mockedCompany: CreateCompanyDto = {
        name: 'Test Company',
        description: 'Test Company Description',
        cnpj: '11111111111',
        email: 'XXXXXXXXXXXXX',
        adminId: '1',
        lat: 123,
        long: 1123,
      };
      const result = await companyController.createCompany(mockedCompany);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', mockedCompany.name);
    });
  });

  describe('listCompanies', () => {
    it('should be able to list companies', async () => {
      const mockedCompanies = [
        {
          id: '1',
          name: 'Test Company 1',
          description: 'Test Company Description 1',
          cnpj: '11111111111',
          email: 'test1@example.com',
          adminId: '1',
          lat: 123,
          long: 1123,
        },
        {
          id: '2',
          name: 'Test Company 2',
          description: 'Test Company Description 2',
          cnpj: '22222222222',
          email: 'test2@example.com',
          adminId: '2',
          lat: 456,
          long: 1456,
        },
      ];

      mockedCompanies.forEach(async (company) => {
        await companyController.createCompany(company);
      });

      const result = await companyController.listCompanies();

      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
    });
  });
});
