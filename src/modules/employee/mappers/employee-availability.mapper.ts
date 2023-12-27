import { EmployeeAvailability } from '@prisma/client';
import { EmployeeAvailabilityResponseDto } from 'src/modules/employee/dtos/employee-availability-response.dto';

export class EmployeeAvailabilityMapper {
  static toResponse(
    data: EmployeeAvailability,
  ): EmployeeAvailabilityResponseDto {
    return {
      id: data.id,
      start: data.start,
      end: data.end,
      companyId: data.companyId,
      employeeId: data.employeeId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
