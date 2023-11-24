import { Test, TestingModule } from '@nestjs/testing';

import { EmployeeController } from 'src/modules/employee/controllers/employee.controller';
import { CreateEmployeeDto } from 'src/modules/employee/dtos/create-employee.dto';
import { UpdateEmployeeDto } from 'src/modules/employee/dtos/update-employee.dto';
import { EmployeeRepositoryFake } from 'src/modules/employee/repositories/fakes/employee.repositoy.fake';
import { CreateEmployeeUseCase } from 'src/modules/employee/usecases/create-employee.use-case';
import { DeleteEmployeeUseCase } from 'src/modules/employee/usecases/delete-employee.use-case';
import { ListEmployeeUseCase } from 'src/modules/employee/usecases/list-employee.use-case';
import { ToggleEmployeeStatusUseCase } from 'src/modules/employee/usecases/toggle-employee-status.use-case';
import { UpdateEmployeeUseCase } from 'src/modules/employee/usecases/update-employee.use-case';
import { CompanyAdminGuardFake } from 'src/modules/shared/fakes/guards/company-role.guard';
import { CompanyAdminGuard } from 'src/modules/shared/infra/guards/company-role.guard';

describe('#Unit - EmployeeController', () => {
  let employeeController: EmployeeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        CreateEmployeeUseCase,
        DeleteEmployeeUseCase,
        ListEmployeeUseCase,
        ToggleEmployeeStatusUseCase,
        UpdateEmployeeUseCase,
        {
          provide: 'IEmployeeRepository',
          useClass: EmployeeRepositoryFake,
        },
      ],
    })
      .overrideGuard(CompanyAdminGuard)
      .useClass(CompanyAdminGuardFake)
      .compile();

    employeeController = app.get<EmployeeController>(EmployeeController);
  });

  describe('createEmployee', () => {
    it('should be able to create an employee', async () => {
      const mockedEmployee: CreateEmployeeDto = {
        name: 'John Doe',
        companyId: '1',
        photoLink: 'XXXXXXXXXXXXXXXX',
      };

      const result = await employeeController.createEmployee(mockedEmployee);

      expect(result).toHaveProperty('id');
      expect(result.companyId).toBe(mockedEmployee.companyId);
    });
  });

  describe('updateEmployee', () => {
    it('should be able to update an employee', async () => {
      const mockedEmployee: CreateEmployeeDto = {
        name: 'John Doe',
        companyId: '1',
        photoLink: 'XXXXXXXXXXXXXXXX',
      };

      const createdEmployee = await employeeController.createEmployee(
        mockedEmployee,
      );

      const updatedEmployee: UpdateEmployeeDto = {
        name: 'Jane Doe',
        photoLink: 'XXXXXXXXXXXXXXXX',
      };

      const result = await employeeController.updateEmployee(
        createdEmployee.id,
        updatedEmployee,
      );

      expect(result).toHaveProperty('id');
      expect(result.name).toBe(updatedEmployee.name);
    });
  });

  describe('deactivateEmployee', () => {
    it('should be able to deactivate an employee', async () => {
      const mockedEmployee: CreateEmployeeDto = {
        name: 'John Doe',
        companyId: '1',
        photoLink: 'XXXXXXXXXXXXXXXX',
      };

      const createdEmployee = await employeeController.createEmployee(
        mockedEmployee,
      );

      const result = await employeeController.deactivateEmployee(
        createdEmployee.id,
      );

      expect(result).toHaveProperty('id');
      expect(result.active).toBe(false);
    });
  });

  describe('activateEmployee', () => {
    it('should be able to activate an employee', async () => {
      const mockedEmployee: CreateEmployeeDto = {
        name: 'John Doe',
        companyId: '1',
        photoLink: 'XXXXXXXXXXXXXXXX',
      };

      const createdEmployee = await employeeController.createEmployee(
        mockedEmployee,
      );

      await employeeController.deactivateEmployee(createdEmployee.id);

      const result = await employeeController.activateEmployee(
        createdEmployee.id,
      );

      expect(result).toHaveProperty('id');
      expect(result.active).toBe(true);
    });
  });

  describe('listByCompany', () => {
    it('should be able to list employees by company', async () => {
      const mockedEmployee: CreateEmployeeDto = {
        name: 'John Doe',
        companyId: '1',
        photoLink: 'XXXXXXXXXXXXXXXX',
      };

      const mockedEmployee2: CreateEmployeeDto = {
        name: 'Jane Doe',
        companyId: '2',
        photoLink: 'XXXXXXXXXXXXXXXX',
      };

      const createdEmployee = await employeeController.createEmployee(
        mockedEmployee,
      );
      await employeeController.createEmployee(mockedEmployee2);

      const result = await employeeController.listByCompany(
        createdEmployee.companyId,
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('id');
      expect(result[0].companyId).toBe(createdEmployee.companyId);
    });
  });

  describe('deleteEmployee', () => {
    it('should be able to delete an employee', async () => {
      const mockedEmployee: CreateEmployeeDto = {
        name: 'John Doe',
        companyId: '1',
        photoLink: 'XXXXXXXXXXXXXXXX',
      };

      const createdEmployee = await employeeController.createEmployee(
        mockedEmployee,
      );

      const result = await employeeController.deleteEmployee(
        createdEmployee.id,
      );

      expect(result).toHaveProperty('id');
    });
  });
});
