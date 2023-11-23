import { Module } from '@nestjs/common';
import { EmployeeAvailabilityController } from 'src/modules/employee/controllers/employee-availability.controller';
import { EmployeeController } from 'src/modules/employee/controllers/employee.controller';
import { EmployeeProviders } from 'src/modules/employee/providers/employee.providers';
import { CreateEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/create-employee-availability.use-case';
import { CreateEmployeeUseCase } from 'src/modules/employee/usecases/create-employee.use-case';
import { DeleteEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/delete-employee-availability.use-case';
import { DeleteEmployeeUseCase } from 'src/modules/employee/usecases/delete-employee.use-case';
import { ListEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/list-employee-availability.use-case';
import { ListEmployeeUseCase } from 'src/modules/employee/usecases/list-employee.use-case';
import { ToggleEmployeeStatusUseCase } from 'src/modules/employee/usecases/toggle-employee-status.use-case';
import { UpdateEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/update-employee-availability.use-case';
import { UpdateEmployeeUseCase } from 'src/modules/employee/usecases/update-employee.use-case';

import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [...EmployeeProviders],
  controllers: [EmployeeController, EmployeeAvailabilityController],
  providers: [
    PrismaService,
    ...EmployeeProviders,
    CreateEmployeeUseCase,
    DeleteEmployeeUseCase,
    ListEmployeeUseCase,
    ToggleEmployeeStatusUseCase,
    UpdateEmployeeUseCase,
    CreateEmployeeAvailabilityUseCase,
    UpdateEmployeeAvailabilityUseCase,
    ListEmployeeAvailabilityUseCase,
    DeleteEmployeeAvailabilityUseCase,
  ],
})
export class EmployeeModule {}
