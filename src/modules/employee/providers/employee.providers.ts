import { EmployeeRepository } from 'src/modules/employee/infra/repositories/employee.repository';

export const EmployeeProviders = [
  {
    provide: 'IEmployeeRepository',
    useClass: EmployeeRepository,
  },
];
