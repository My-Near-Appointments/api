import { Inject, Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from 'src/modules/employee/dtos/update-employee.dto';
import { IEmployeeRepository } from 'src/modules/employee/repositories/employe.repository.interface';

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  public async execute(id: string, updateEmployee: UpdateEmployeeDto) {
    return this.employeeRepository.update(updateEmployee, id);
  }
}
