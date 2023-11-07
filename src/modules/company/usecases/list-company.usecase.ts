import { Inject, Injectable } from '@nestjs/common';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';

@Injectable()
export class ListCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  public async execute() {
    return this.companyRepository.getAll();
  }
}
