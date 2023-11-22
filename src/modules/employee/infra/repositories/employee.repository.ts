import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/modules/employee/dtos/create-employee.dto';
import { EmployeeResponseDto } from 'src/modules/employee/dtos/employee-response.dto';
import { UpdateEmployeeDto } from 'src/modules/employee/dtos/update-employee.dto';
import { EmployeeMapper } from 'src/modules/employee/mappers/employee.mapper';
import { IEmployeeRepository } from 'src/modules/employee/repositories/employe.repository.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    const employee = await this.prismaService.employee.create({
      data: {
        name: data.name,
        active: true,
        photoLink: data.photoLink,
        company: {
          connect: {
            id: data.companyId,
          },
        },
      },
    });

    return EmployeeMapper.toResponse(employee);
  }

  async getAllByCompanyId(
    companyId: string,
    page = 1,
  ): Promise<EmployeeResponseDto[]> {
    const perPage = 20;
    const skip = (page - 1) * perPage;

    const employees = await this.prismaService.employee.findMany({
      where: {
        companyId,
      },
      skip,
      take: perPage,
    });

    return employees.map((employee) => EmployeeMapper.toResponse(employee));
  }

  async toggleStatus(
    id: string,
    status: boolean,
  ): Promise<EmployeeResponseDto> {
    const employee = await this.prismaService.employee.update({
      where: {
        id,
      },
      data: {
        active: status,
      },
    });

    return EmployeeMapper.toResponse(employee);
  }

  async update(
    data: UpdateEmployeeDto,
    id: string,
  ): Promise<EmployeeResponseDto> {
    const employee = await this.prismaService.employee.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        photoLink: data.photoLink,
      },
    });

    return EmployeeMapper.toResponse(employee);
  }

  async delete(id: string): Promise<EmployeeResponseDto> {
    const employee = await this.prismaService.employee.delete({
      where: {
        id,
      },
    });

    return EmployeeMapper.toResponse(employee);
  }

  async getAll(): Promise<EmployeeResponseDto[]> {
    const employees = await this.prismaService.employee.findMany();

    return employees.map((employee) => EmployeeMapper.toResponse(employee));
  }
}
