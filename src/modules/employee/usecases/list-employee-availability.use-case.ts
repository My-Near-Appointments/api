import { Injectable, Inject } from '@nestjs/common';

import { IEmployeeAvailabilityRepository } from 'src/modules/employee/repositories/employee-availability.repository.interface';

@Injectable()
export class ListEmployeeAvailabilityUseCase {
  constructor(
    @Inject('IEmployeeAvailabilityRepository')
    private readonly employeeRepository: IEmployeeAvailabilityRepository,
  ) {}

  public async execute(employeeId: string) {
    return this.employeeRepository.findByEmployeeId(employeeId);
  }
}
