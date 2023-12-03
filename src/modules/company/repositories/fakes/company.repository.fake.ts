import { Injectable } from '@nestjs/common';
import { States } from 'src/modules/company/dtos/address.dto';
import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { UpdateCompanyDto } from 'src/modules/company/dtos/update-company.dto';
import {
  CompanyData,
  CompanyMapper,
} from 'src/modules/company/mappers/company.mapper';
import { ICompanyRepository } from 'src/modules/company/repositories/company.repository.interface';

@Injectable()
export class CompanyRepositoryFake implements ICompanyRepository {
  company: CompanyData[] = [];

  async getAll(): Promise<ICompanyResponseDto[]> {
    return await this.company.map((company) =>
      CompanyMapper.toResponse(company),
    );
  }

  async create(data: CreateCompanyDto): Promise<ICompanyResponseDto> {
    const mockedData: CompanyData = {
      id: crypto.randomUUID(),
      adminId: data.adminId,
      addressId: 'aaa',
      name: data.name,
      active: false,
      description: data.description,
      cnpj: data.cnpj,
      email: data.email,
      address: {
        number: data.address.number,
        street: data.address.street,
        city: data.address.city,
        state: data.address.state as States,
        neighborhood: data.address.neighborhood,
        zip: data.address.zip,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.company.push(mockedData);

    return CompanyMapper.toResponse(this.company[this.company.length - 1]);
  }

  async update(
    data: UpdateCompanyDto,
    id: string,
  ): Promise<ICompanyResponseDto> {
    const mockedData = {
      id: crypto.randomUUID(),
      addressId: 'aaa',
      name: data.name,
      active: false,
      description: data.description,
      address: {
        id: crypto.randomUUID(),
        number: data.address.number,
        street: data.address.street,
        city: data.address.city,
        state: data.address.state as States,
        neighborhood: data.address.neighborhood,
        zip: data.address.zip,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const companyIndex = this.company.findIndex((company) => company.id === id);

    this.company[companyIndex] = {
      ...this.company[companyIndex],
      ...mockedData,
    };

    return await CompanyMapper.toResponse(this.company[companyIndex]);
  }

  async toggleStatus(
    id: string,
    status: boolean,
  ): Promise<ICompanyResponseDto> {
    const companyIndex = this.company.findIndex((value) => value.id === id);

    this.company[companyIndex] = {
      ...this.company[companyIndex],
      active: status,
    };

    return await CompanyMapper.toResponse(this.company[companyIndex]);
  }
}
