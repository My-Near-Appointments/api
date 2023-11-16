import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { UpdateCompanyDto } from 'src/modules/company/dtos/update-company.dto';

export interface ICompanyRepository {
  create(data: CreateCompanyDto): Promise<ICompanyResponseDto>;
  update(data: UpdateCompanyDto, id: string): Promise<ICompanyResponseDto>;
  toggleStatus(id: string, status: boolean): Promise<ICompanyResponseDto>;
  getAll(): Promise<ICompanyResponseDto[]>;
}
