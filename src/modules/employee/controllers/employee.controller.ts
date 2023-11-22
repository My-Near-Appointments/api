import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateEmployeeDto } from 'src/modules/employee/dtos/create-employee.dto';
import { EmployeeResponseDto } from 'src/modules/employee/dtos/employee-response.dto';
import { UpdateEmployeeDto } from 'src/modules/employee/dtos/update-employee.dto';
import { CreateEmployeeUseCase } from 'src/modules/employee/usecases/create-employee.use-case';
import { DeleteEmployeeUseCase } from 'src/modules/employee/usecases/delete-employee.use-case';
import { ListEmployeeUseCase } from 'src/modules/employee/usecases/list-employee.use-case';
import { ToggleEmployeeStatusUseCase } from 'src/modules/employee/usecases/toggle-employee-status.use-case';
import { UpdateEmployeeUseCase } from 'src/modules/employee/usecases/update-employee.use-case';
import { CompanyAdminGuard } from 'src/modules/shared/infra/guards/company-role.guard';

@Controller('v1/employee')
export class EmployeeController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly listEmployeeUseCase: ListEmployeeUseCase,
    private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase,
    private readonly toggleEmployeeStatusUseCase: ToggleEmployeeStatusUseCase,
  ) {}

  @ApiTags('employee')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Employee created',
    type: EmployeeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'), CompanyAdminGuard)
  @Post()
  async create(@Body() data: CreateEmployeeDto) {
    return await this.createEmployeeUseCase.execute(data);
  }

  @ApiTags('employee')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee updated',
    type: EmployeeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'), CompanyAdminGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateEmployeeDto) {
    return await this.updateEmployeeUseCase.execute(id, data);
  }

  @ApiTags('employee')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee deactivated',
    type: EmployeeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('/deactivate/:employeeId')
  async deactivateCompany(@Param('employeeId') id: string) {
    return this.toggleEmployeeStatusUseCase.execute(id, false);
  }

  @ApiTags('employee')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee activated',
    type: EmployeeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('/activate/:employeeId')
  async activateCompany(@Param('employeeId') id: string) {
    return this.toggleEmployeeStatusUseCase.execute(id, true);
  }

  @ApiTags('employee')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee listed',
    type: EmployeeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'), CompanyAdminGuard)
  @Get(':companyId')
  async listByCompany(@Param('companyId') companyId: string) {
    return await this.listEmployeeUseCase.execute(companyId);
  }

  @ApiTags('employee')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee removed',
    type: EmployeeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'), CompanyAdminGuard)
  @Delete(':employeeId')
  async delete(@Param('employeeId') employeeId: string) {
    return await this.deleteEmployeeUseCase.execute(employeeId);
  }
}
