import { States } from 'src/modules/company/dtos/address.dto';

export class ICompanyResponseDto {
  id: string;
  name: string;
  cnpj: string;
  description: string;
  email: string;
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
  address: {
    number: number;
    street: string;
    neighborhood: string;
    city: string;
    state: States;
    zip: string;
  };
}
