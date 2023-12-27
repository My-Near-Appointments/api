import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { CreateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/create-employee-availability.dto';
import { IEmployeeAvailabilityRepository } from 'src/modules/employee/repositories/employee-availability.repository.interface';

@Injectable()
export class CreateEmployeeAvailabilityUseCase {
  constructor(
    @Inject('IEmployeeAvailabilityRepository')
    private readonly employeeRepository: IEmployeeAvailabilityRepository,
  ) {}

  public async execute(createEmployee: CreateEmployeeAvailabilityDto) {
    const availabilityAlreadyTaken =
      await this.employeeRepository.findByStartAndEnd(
        createEmployee.start,
        createEmployee.end,
      );

    if (availabilityAlreadyTaken) {
      throw new ConflictException('Availability already taken');
    }

    return this.employeeRepository.create(createEmployee);
  }
}
