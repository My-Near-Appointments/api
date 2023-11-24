export class EmployeeResponseDto {
  id: string;
  name: string;
  photoLink: string;
  active?: boolean;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}
