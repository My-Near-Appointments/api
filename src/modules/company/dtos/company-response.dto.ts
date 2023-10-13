export interface ICompanyResponseDto {
  id: string;
  name: string;
  cnpj: string;
  description: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  address: {
    lat: number;
    long: number;
  };
}
