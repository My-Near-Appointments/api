import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from 'src/modules/employee/repositories/employe.repository.interface';

@Injectable()
export class ToggleEmployeeStatusUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  public async execute(employeeId: string, status: boolean) {
    return this.employeeRepository.toggleStatus(employeeId, status);
  }
}
