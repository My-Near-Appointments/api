import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { EmployeeAvailabilityController } from 'src/modules/employee/controllers/employee-availability.controller';
import { CreateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/create-employee-availability.dto';
import { EmployeeAvailabilityRepositoryFake } from 'src/modules/employee/repositories/fakes/employee-availability.repository.fake';
import { CreateEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/create-employee-availability.use-case';
import { DeleteEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/delete-employee-availability.use-case';
import { ListEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/list-employee-availability.use-case';
import { UpdateEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/update-employee-availability.use-case';
import { CompanyAdminGuardFake } from 'src/modules/shared/fakes/guards/company-role.guard';
import { CompanyAdminGuard } from 'src/modules/shared/infra/guards/company-role.guard';

describe('#Unit - EmployeeAvailabilityController', () => {
  let employeeAvailabilityController: EmployeeAvailabilityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeAvailabilityController],
      providers: [
        CreateEmployeeAvailabilityUseCase,
        UpdateEmployeeAvailabilityUseCase,
        ListEmployeeAvailabilityUseCase,
        DeleteEmployeeAvailabilityUseCase,
        {
          provide: 'IEmployeeAvailabilityRepository',
          useClass: EmployeeAvailabilityRepositoryFake,
        },
      ],
    })
      .overrideGuard(CompanyAdminGuard)
      .useClass(CompanyAdminGuardFake)
      .compile();

    employeeAvailabilityController = app.get<EmployeeAvailabilityController>(
      EmployeeAvailabilityController,
    );
  });

  describe('createEmployeeAvailability', () => {
    it('should be able to create an employeeAvailability', async () => {
      const mockedEmployeeAvailability: CreateEmployeeAvailabilityDto = {
        start: new Date(),
        end: new Date(),
        employeeId: '1',
      };

      const result =
        await employeeAvailabilityController.createEmployeeAvailability(
          mockedEmployeeAvailability,
        );

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('start');
      expect(result).toHaveProperty('end');
    });
  });

  describe('updateEmployeeAvailability', () => {
    it('should be able to update an employeeAvailability', async () => {
      const mockedEmployeeAvailability: CreateEmployeeAvailabilityDto = {
        start: new Date(),
        end: new Date(),
        employeeId: '1',
      };

      const createdEmployeeAvailability =
        await employeeAvailabilityController.createEmployeeAvailability(
          mockedEmployeeAvailability,
        );

      const updatedData = {
        ...createdEmployeeAvailability,
        start: new Date(),
        end: new Date(),
      };

      const result =
        await employeeAvailabilityController.updateEmployeeAvailability(
          '1',
          updatedData,
        );

      expect(result).toHaveProperty('id');
      expect(result.start).toBe(updatedData.start);
      expect(result.end).toBe(updatedData.end);
    });
  });

  describe('listByEmployeeId', () => {
    it('should be able to list all employeeAvailability by employeeId', async () => {
      const mockedEmployeeAvailability: CreateEmployeeAvailabilityDto = {
        start: new Date(),
        end: new Date(),
        employeeId: '1',
      };

      const mockedEmployeeAvailability2: CreateEmployeeAvailabilityDto = {
        start: new Date(),
        end: new Date(),
        employeeId: '2',
      };

      await employeeAvailabilityController.createEmployeeAvailability(
        mockedEmployeeAvailability,
      );
      await employeeAvailabilityController.createEmployeeAvailability(
        mockedEmployeeAvailability2,
      );

      const result = await employeeAvailabilityController.listByEmployeeId(
        mockedEmployeeAvailability.employeeId,
      );

      expect(result.length).toBe(1);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('start');
      expect(result[0]).toHaveProperty('end');
      expect(result[0].employeeId).toBe('1');
    });
  });

  describe('deleteEmployeeAvailability', () => {
    it('should be able to delete an employeeAvailability', async () => {
      const mockedEmployeeAvailability: CreateEmployeeAvailabilityDto = {
        start: new Date(),
        end: new Date(),
        employeeId: '1',
      };

      const createdEmployeeAvailability =
        await employeeAvailabilityController.createEmployeeAvailability(
          mockedEmployeeAvailability,
        );

      const result =
        await employeeAvailabilityController.deleteEmployeeAvailability(
          createdEmployeeAvailability.id,
        );

      expect(result).toHaveProperty('id');
    });
  });
});
