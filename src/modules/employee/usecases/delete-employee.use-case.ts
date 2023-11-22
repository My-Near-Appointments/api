import { Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from 'src/modules/employee/repositories/employe.repository.interface';

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  public async execute(employeeId: string) {
    return this.employeeRepository.delete(employeeId);
  }
}
