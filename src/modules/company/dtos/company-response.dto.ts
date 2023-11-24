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
    lat: number;
    long: number;
  };
}
