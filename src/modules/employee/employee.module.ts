import { Module } from '@nestjs/common';
import { EmployeeController } from 'src/modules/employee/controllers/employee.controller';
import { EmployeeProviders } from 'src/modules/employee/providers/employee.providers';
import { CreateEmployeeUseCase } from 'src/modules/employee/usecases/create-employee.use-case';
import { DeleteEmployeeUseCase } from 'src/modules/employee/usecases/delete-employee.use-case';
import { ListEmployeeUseCase } from 'src/modules/employee/usecases/list-employee.use-case';
import { ToggleEmployeeStatusUseCase } from 'src/modules/employee/usecases/toggle-employee-status.use-case';
import { UpdateEmployeeUseCase } from 'src/modules/employee/usecases/update-employee.use-case';
import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [...EmployeeProviders],
  controllers: [EmployeeController],
  providers: [
    PrismaService,
    ...EmployeeProviders,
    CreateEmployeeUseCase,
    DeleteEmployeeUseCase,
    ListEmployeeUseCase,
    ToggleEmployeeStatusUseCase,
    UpdateEmployeeUseCase,
  ],
})
export class EmployeeModule {}
