import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/create-employee-availability.dto';
import { EmployeeAvailabilityResponseDto } from 'src/modules/employee/dtos/employee-availability-response.dto';
import { UpdateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/update-employee-availability.dto';
import { EmployeeAvailabilityMapper } from 'src/modules/employee/mappers/employee-availability.mapper';
import { IEmployeeAvailabilityRepository } from 'src/modules/employee/repositories/employee-availability.repository.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeeAvailabilityRepository
  implements IEmployeeAvailabilityRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: CreateEmployeeAvailabilityDto,
  ): Promise<EmployeeAvailabilityResponseDto> {
    const employeeAvailability =
      await this.prismaService.employeeAvailability.create({
        data: {
          start: data.start,
          end: data.end,
          employee: {
            connect: {
              id: data.employeeId,
            },
          },
        },
      });

    return EmployeeAvailabilityMapper.toResponse(employeeAvailability);
  }

  async update(
    data: UpdateEmployeeAvailabilityDto,
    id: string,
  ): Promise<EmployeeAvailabilityResponseDto> {
    const employeeAvailabilityExists =
      await this.prismaService.employeeAvailability.findUnique({
        where: {
          id,
        },
      });

    if (!employeeAvailabilityExists) {
      throw new NotFoundException('EmployeeAvailability not found');
    }

    const employeeAvailability =
      await this.prismaService.employeeAvailability.update({
        where: {
          id,
        },
        data: {
          start: data.start,
          end: data.end,
        },
      });

    return EmployeeAvailabilityMapper.toResponse(employeeAvailability);
  }

  async delete(id: string): Promise<EmployeeAvailabilityResponseDto> {
    const employeeAvailabilityExists =
      await this.prismaService.employeeAvailability.findUnique({
        where: {
          id,
        },
      });

    if (!employeeAvailabilityExists) {
      throw new NotFoundException('EmployeeAvailability not found');
    }

    const employeeAvailability =
      await this.prismaService.employeeAvailability.delete({
        where: {
          id,
        },
      });

    return EmployeeAvailabilityMapper.toResponse(employeeAvailability);
  }

  async findByEmployeeId(
    id: string,
  ): Promise<EmployeeAvailabilityResponseDto[]> {
    const employeeAvailabilities =
      await this.prismaService.employeeAvailability.findMany({
        where: {
          id,
        },
      });

    return employeeAvailabilities.map((availability) =>
      EmployeeAvailabilityMapper.toResponse(availability),
    );
  }
}
