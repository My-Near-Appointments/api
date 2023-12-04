import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';

@Injectable()
export class GetCompanyUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  public async execute(userId: string) {
    return this.companyRepository.get(userId);
  }
}
