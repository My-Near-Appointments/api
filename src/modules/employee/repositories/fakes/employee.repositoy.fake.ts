import { Employee } from '@prisma/client';
import { CreateEmployeeDto } from 'src/modules/employee/dtos/create-employee.dto';
import { EmployeeResponseDto } from 'src/modules/employee/dtos/employee-response.dto';
import { UpdateEmployeeDto } from 'src/modules/employee/dtos/update-employee.dto';
import { EmployeeMapper } from 'src/modules/employee/mappers/employee.mapper';
import { IEmployeeRepository } from 'src/modules/employee/repositories/employee.repository.interface';

export class EmployeeRepositoryFake implements IEmployeeRepository {
  employee: Employee[] = [];

  async create(data: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    const mockedData: Employee = {
      id: crypto.randomUUID(),
      name: data.name,
      active: true,
      photoLink: data.photoLink,
      companyId: data.companyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.employee.push(mockedData);

    return EmployeeMapper.toResponse(this.employee[this.employee.length - 1]);
  }

  async update(
    data: UpdateEmployeeDto,
    id: string,
  ): Promise<EmployeeResponseDto> {
    const employeeIndex = this.employee.findIndex((value) => value.id === id);

    this.employee[employeeIndex] = {
      ...this.employee[employeeIndex],
      ...data,
    };

    return await EmployeeMapper.toResponse(this.employee[employeeIndex]);
  }

  async toggleStatus(
    id: string,
    status: boolean,
  ): Promise<EmployeeResponseDto> {
    const employeeIndex = this.employee.findIndex((value) => value.id === id);

    this.employee[employeeIndex] = {
      ...this.employee[employeeIndex],
      active: status,
    };

    return await EmployeeMapper.toResponse(this.employee[employeeIndex]);
  }

  async delete(id: string): Promise<EmployeeResponseDto> {
    const removedItem = this.employee.find((employee) => employee.id === id);

    this.employee.filter((employee) => employee.id !== id);

    return EmployeeMapper.toResponse(removedItem);
  }

  async getAll(): Promise<EmployeeResponseDto[]> {
    return this.employee.map((employee) => EmployeeMapper.toResponse(employee));
  }

  async getAllByCompanyId(companyId: string): Promise<EmployeeResponseDto[]> {
    return this.employee
      .filter((employee) => employee.companyId === companyId)
      .map((employee) => EmployeeMapper.toResponse(employee));
  }
}
