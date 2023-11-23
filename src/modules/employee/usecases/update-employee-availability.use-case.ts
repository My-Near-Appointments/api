import { Injectable, Inject } from '@nestjs/common';
import { UpdateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/update-employee-availability.dto';
import { IEmployeeAvailabilityRepository } from 'src/modules/employee/repositories/employee-availability.repository.interface';

@Injectable()
export class UpdateEmployeeAvailabilityUseCase {
  constructor(
    @Inject('IEmployeeAvailabilityRepository')
    private readonly employeeRepository: IEmployeeAvailabilityRepository,
  ) {}

  public async execute(
    id: string,
    updateEmployee: UpdateEmployeeAvailabilityDto,
  ) {
    return this.employeeRepository.update(updateEmployee, id);
  }
}
