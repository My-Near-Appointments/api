import { CreateEmployeeDto } from 'src/modules/employee/dtos/create-employee.dto';
import { EmployeeResponseDto } from 'src/modules/employee/dtos/employee-response.dto';
import { UpdateEmployeeDto } from 'src/modules/employee/dtos/update-employee.dto';

export interface IEmployeeRepository {
  create(data: CreateEmployeeDto): Promise<EmployeeResponseDto>;
  update(data: UpdateEmployeeDto, id: string): Promise<EmployeeResponseDto>;
  toggleStatus(id: string, status: boolean): Promise<EmployeeResponseDto>;
  delete(id: string): Promise<EmployeeResponseDto>;
  getAll(): Promise<EmployeeResponseDto[]>;
  getAllByCompanyId(companyId: string): Promise<EmployeeResponseDto[]>;
}
