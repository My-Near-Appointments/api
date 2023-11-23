import { EmployeeAvailabilityRepository } from 'src/modules/employee/infra/repositories/employee-availability.repository';
import { EmployeeRepository } from 'src/modules/employee/infra/repositories/employee.repository';

export const EmployeeProviders = [
  {
    provide: 'IEmployeeRepository',
    useClass: EmployeeRepository,
  },
  {
    provide: 'IEmployeeAvailabilityRepository',
    useClass: EmployeeAvailabilityRepository,
  },
];
