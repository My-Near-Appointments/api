import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from 'src/modules/employee/repositories/employee.repository.interface';

@Injectable()
export class ListEmployeeUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  public async execute(companyId: string) {
    return this.employeeRepository.getAllByCompanyId(companyId);
  }
}
