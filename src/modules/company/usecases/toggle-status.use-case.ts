import { Injectable, Inject } from '@nestjs/common';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';

@Injectable()
export class ToggleStatusUseCase {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  public async execute(id: string, status: boolean) {
    return this.companyRepository.toggleStatus(id, status);
  }
}
