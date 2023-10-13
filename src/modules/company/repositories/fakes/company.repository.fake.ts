import { Injectable } from '@nestjs/common';
import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import {
  CompanyData,
  CompanyMapper,
} from 'src/modules/company/mappers/company.mapper';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';

@Injectable()
export class CompanyRepositoryFake implements ICompanyRepository {
  company: ICompanyResponseDto[] = [];

  async create(data: CreateCompanyDto): Promise<ICompanyResponseDto> {
    const mockedData: CompanyData = {
      id: crypto.randomUUID(),
      adminId: data.adminId,
      addressId: 'aaa',
      name: data.name,
      description: data.description,
      cnpj: data.cnpj,
      email: data.email,
      address: {
        latitude: data.lat,
        longitude: data.long,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.company.push(CompanyMapper.toResponse(mockedData));
    return this.company[this.company.length - 1];
  }
}
