import { CreateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/create-employee-availability.dto';
import { EmployeeAvailabilityResponseDto } from 'src/modules/employee/dtos/employee-availability-response.dto';
import { UpdateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/update-employee-availability.dto';

export interface IEmployeeAvailabilityRepository {
  create(
    data: CreateEmployeeAvailabilityDto,
  ): Promise<EmployeeAvailabilityResponseDto>;
  update(
    data: UpdateEmployeeAvailabilityDto,
    id: string,
  ): Promise<EmployeeAvailabilityResponseDto>;
  delete(id: string): Promise<EmployeeAvailabilityResponseDto>;
  findByEmployeeId(id: string): Promise<EmployeeAvailabilityResponseDto[]>;
}
