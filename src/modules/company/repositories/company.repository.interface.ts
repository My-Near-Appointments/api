import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';

export interface ICompanyRepository {
  create(data: CreateCompanyDto): Promise<ICompanyResponseDto>;
}
