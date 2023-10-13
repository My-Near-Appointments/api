import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  public async execute(createCompany: CreateCompanyDto) {
    return this.companyRepository.create(createCompany);
  }
}
