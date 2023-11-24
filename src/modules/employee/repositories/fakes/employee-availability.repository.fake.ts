import { EmployeeAvailability } from '@prisma/client';
import { CreateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/create-employee-availability.dto';
import { EmployeeAvailabilityResponseDto } from 'src/modules/employee/dtos/employee-availability-response.dto';
import { UpdateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/update-employee-availability.dto';
import { EmployeeAvailabilityMapper } from 'src/modules/employee/mappers/employee-availability.mapper';
import { IEmployeeAvailabilityRepository } from 'src/modules/employee/repositories/employee-availability.repository.interface';

export class EmployeeAvailabilityRepositoryFake
  implements IEmployeeAvailabilityRepository
{
  employeeAvailability: EmployeeAvailability[] = [];

  async create(
    data: CreateEmployeeAvailabilityDto,
  ): Promise<EmployeeAvailabilityResponseDto> {
    const mockedEmployeeAvailability: EmployeeAvailability = {
      id: crypto.randomUUID(),
      start: data.start,
      end: data.end,
      employeeId: data.employeeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.employeeAvailability.push(mockedEmployeeAvailability);

    return EmployeeAvailabilityMapper.toResponse(
      this.employeeAvailability[this.employeeAvailability.length - 1],
    );
  }

  async update(
    data: UpdateEmployeeAvailabilityDto,
    id: string,
  ): Promise<EmployeeAvailabilityResponseDto> {
    const employeeAvailabilityIndex = this.employeeAvailability.findIndex(
      (employeeAvailability) => employeeAvailability.id === id,
    );

    this.employeeAvailability[employeeAvailabilityIndex] = {
      ...this.employeeAvailability[employeeAvailabilityIndex],
      ...data,
    };

    return EmployeeAvailabilityMapper.toResponse(
      this.employeeAvailability[employeeAvailabilityIndex],
    );
  }

  async delete(id: string): Promise<EmployeeAvailabilityResponseDto> {
    const removedItem = this.employeeAvailability.find(
      (employeeAvailability) => employeeAvailability.id === id,
    );

    this.employeeAvailability.filter(
      (employeeAvailability) => employeeAvailability.id !== id,
    );

    return EmployeeAvailabilityMapper.toResponse(removedItem);
  }

  async findByEmployeeId(
    id: string,
  ): Promise<EmployeeAvailabilityResponseDto[]> {
    const filteredEmployeeAvailability = this.employeeAvailability
      .filter((employeeAvailability) => employeeAvailability.employeeId === id)
      .map((employeeAvailability) =>
        EmployeeAvailabilityMapper.toResponse(employeeAvailability),
      );

    return filteredEmployeeAvailability;
  }
}
