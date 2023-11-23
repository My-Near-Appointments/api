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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/create-employee-availability.dto';
import { EmployeeAvailabilityResponseDto } from 'src/modules/employee/dtos/employee-availability-response.dto';
import { UpdateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/update-employee-availability.dto';
import { CreateEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/create-employee-availability.use-case';
import { DeleteEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/delete-employee-availability.use-case';
import { ListEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/list-employee-availability.use-case';
import { UpdateEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/update-employee-availability.use-case';

@Controller('v1/employee-availability')
export class EmployeeAvailabilityController {
  constructor(
    private readonly createEmployeeAvailabilityUseCase: CreateEmployeeAvailabilityUseCase,
    private readonly updateEmployeeAvailabilityUseCase: UpdateEmployeeAvailabilityUseCase,
    private readonly listEmployeeAvailabilityUseCase: ListEmployeeAvailabilityUseCase,
    private readonly deleteEmployeeAvailabilityUseCase: DeleteEmployeeAvailabilityUseCase,
  ) {}

  @ApiTags('employee-availability')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Employee availability created',
    type: EmployeeAvailabilityResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: CreateEmployeeAvailabilityDto) {
    return await this.createEmployeeAvailabilityUseCase.execute(data);
  }

  @ApiTags('employee-availability')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee availability updated',
    type: EmployeeAvailabilityResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':employeeId')
  async update(
    @Param('employeeId') id: string,
    @Body() data: UpdateEmployeeAvailabilityDto,
  ) {
    return await this.updateEmployeeAvailabilityUseCase.execute(id, data);
  }

  @ApiTags('employee-availability')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee availability listed',
    type: EmployeeAvailabilityResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':employeeId')
  async list(@Param('employeeId') id: string) {
    return await this.listEmployeeAvailabilityUseCase.execute(id);
  }

  @ApiTags('employee-availability')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee availability removed',
    type: EmployeeAvailabilityResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':employeeId')
  async delete(@Param('employeeId') id: string) {
    return await this.deleteEmployeeAvailabilityUseCase.execute(id);
  }
}
