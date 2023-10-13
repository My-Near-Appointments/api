import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from 'src/modules/company/controllers/company.controller';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { CompanyRepositoryFake } from 'src/modules/company/repositories/fakes/company.repository.fake';
import { CreateCompanyUseCase } from 'src/modules/company/usecases/create-company.use-case';

describe('#Unit - CompanyController', () => {
  let companyController: CompanyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CreateCompanyUseCase,
        { provide: 'ICompanyRepository', useClass: CompanyRepositoryFake },
      ],
    }).compile();

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
});
