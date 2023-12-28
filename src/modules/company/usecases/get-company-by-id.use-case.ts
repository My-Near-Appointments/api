import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';

@Injectable()
export class GetCompanyByIdUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  public async execute(id: string) {
    return this.companyRepository.get(id);
  }
}
