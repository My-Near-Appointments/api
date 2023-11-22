import { Employee } from '@prisma/client';
import { EmployeeResponseDto } from 'src/modules/employee/dtos/employee-response.dto';

export class EmployeeMapper {
  static toResponse(data: Employee): EmployeeResponseDto {
    return {
      id: data.id,
      name: data.name,
      photoLink: data.name,
      companyId: data.companyId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
