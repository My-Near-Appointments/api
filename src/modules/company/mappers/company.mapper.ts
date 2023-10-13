import { Company } from '@prisma/client';
import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';

export type CompanyData = {
  address: { latitude: number; longitude: number };
} & Company;
export class CompanyMapper {
  static toResponse(data: CompanyData): ICompanyResponseDto {
    return {
      id: data.id,
      name: data.name,
      cnpj: data.cnpj,
      email: data.email,
      description: data.description,
      address: {
        lat: data.address.latitude,
        long: data.address.longitude,
      },
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
