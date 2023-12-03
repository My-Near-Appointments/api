import { Company } from '@prisma/client';
import { States } from 'src/modules/company/dtos/address.dto';
import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';

export type CompanyData = {
  address: {
    number: number;
    street: string;
    city: string;
    state: string;
    neighborhood: string;
    zip: string;
  };
} & Company;
export class CompanyMapper {
  static toResponse(data: CompanyData): ICompanyResponseDto {
    return {
      id: data.id,
      name: data.name,
      cnpj: data.cnpj,
      email: data.email,
      description: data.description,
      active: data.active,
      address: {
        number: data.address.number,
        street: data.address.street,
        city: data.address.city,
        state: data.address.state as States,
        neighborhood: data.address.neighborhood,
        zip: data.address.zip,
      },
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
