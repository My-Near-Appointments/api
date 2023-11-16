import { Injectable } from '@nestjs/common';
import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { UpdateCompanyDto } from 'src/modules/company/dtos/update-company.dto';
import { CompanyMapper } from 'src/modules/company/mappers/company.mapper';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<ICompanyResponseDto[]> {
    const companies = await this.prismaService.company.findMany({
      include: {
        address: {
          select: {
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    const result = companies.map((company) =>
      CompanyMapper.toResponse(company),
    );

    return result;
  }

  async update(
    data: UpdateCompanyDto,
    id: string,
  ): Promise<ICompanyResponseDto> {
    const company = await this.prismaService.company.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        address: {
          update: {
            latitude: data.lat,
            longitude: data.long,
          },
        },
      },
      include: {
        address: {
          select: {
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    return CompanyMapper.toResponse(company);
  }

  async create(data: CreateCompanyDto): Promise<ICompanyResponseDto> {
    const company = await this.prismaService.company.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        active: false,
        description: data.description,
        email: data.email,
        adminId: data.adminId,
        address: {
          create: {
            latitude: data.lat,
            longitude: data.long,
          },
        },
        User: {
          connect: {
            id: data.adminId,
          },
        },
      },
      include: {
        address: {
          select: {
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    return CompanyMapper.toResponse(company);
  }

  async toggleStatus(
    id: string,
    status: boolean,
  ): Promise<ICompanyResponseDto> {
    const company = await this.prismaService.company.update({
      where: {
        id,
      },
      data: {
        active: status,
      },
      include: {
        address: {
          select: {
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    return CompanyMapper.toResponse(company);
  }
}
