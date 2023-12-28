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
            number: true,
            street: true,
            city: true,
            state: true,
            neighborhood: true,
            zip: true,
          },
        },
      },
    });

    const result = companies.map((company) =>
      CompanyMapper.toResponse(company),
    );

    return result;
  }

  async get(id: string): Promise<ICompanyResponseDto> {
    const company = await this.prismaService.company.findFirst({
      where: { id },
      include: {
        address: {
          select: {
            number: true,
            street: true,
            city: true,
            state: true,
            neighborhood: true,
            zip: true,
          },
        },
      },
    });

    return CompanyMapper.toResponse(company);
  }

  async getByOwnerId(userId: string): Promise<ICompanyResponseDto> {
    const company = await this.prismaService.company.findFirst({
      where: { adminId: userId },
      include: {
        address: {
          select: {
            number: true,
            street: true,
            city: true,
            state: true,
            neighborhood: true,
            zip: true,
          },
        },
      },
    });

    return CompanyMapper.toResponse(company);
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
            number: data.address.number,
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            neighborhood: data.address.neighborhood,
            zip: data.address.zip,
          },
        },
      },
      include: {
        address: true,
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
            number: data.address.number,
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            neighborhood: data.address.neighborhood,
            zip: data.address.zip,
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
            number: true,
            street: true,
            city: true,
            state: true,
            neighborhood: true,
            zip: true,
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
            number: true,
            street: true,
            city: true,
            state: true,
            neighborhood: true,
            zip: true,
          },
        },
      },
    });

    return CompanyMapper.toResponse(company);
  }
}
