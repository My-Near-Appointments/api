import { Injectable, Inject } from '@nestjs/common';
import { UpdateCompanyDto } from 'src/modules/company/dtos/update-company.dto';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  public async execute(id: string, updateCompany: UpdateCompanyDto) {
    return this.companyRepository.update(updateCompany, id);
  }
}
