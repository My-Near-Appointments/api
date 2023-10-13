import { Injectable } from '@nestjs/common';
import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { CompanyMapper } from 'src/modules/company/mappers/company.mapper';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateCompanyDto): Promise<ICompanyResponseDto> {
    const company = await this.prismaService.company.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        description: data.description,
        email: data.email,
        adminId: data.adminId,
        address: {
          create: {
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
}
