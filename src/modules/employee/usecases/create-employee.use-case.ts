import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/modules/employee/dtos/create-employee.dto';
import { IEmployeeRepository } from 'src/modules/employee/repositories/employee.repository.interface';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  public async execute(createEmployee: CreateEmployeeDto) {
    return this.employeeRepository.create(createEmployee);
  }
}
