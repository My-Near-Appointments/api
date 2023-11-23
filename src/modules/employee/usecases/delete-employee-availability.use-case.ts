import { Inject, Injectable } from '@nestjs/common';

import { IEmployeeAvailabilityRepository } from 'src/modules/employee/repositories/employee-availability.repository.interface';

@Injectable()
export class DeleteEmployeeAvailabilityUseCase {
  constructor(
    @Inject('IEmployeeAvailabilityRepository')
    private readonly employeeRepository: IEmployeeAvailabilityRepository,
  ) {}

  public async execute(id: string) {
    return this.employeeRepository.delete(id);
  }
}
