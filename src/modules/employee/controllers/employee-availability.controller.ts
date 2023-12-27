import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeAvailabilityDto } from 'src/modules/employee/dtos/create-employee-availability.dto';
import { EmployeeAvailabilityResponseDto } from 'src/modules/employee/dtos/employee-availability-response.dto';
import { CreateEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/create-employee-availability.use-case';
import { ListEmployeeAvailabilityUseCase } from 'src/modules/employee/usecases/list-employee-availability.use-case';

@Controller('v1/employee-availability')
export class EmployeeAvailabilityController {
  constructor(
    private readonly createEmployeeAvailabilityUseCase: CreateEmployeeAvailabilityUseCase,
    private readonly listEmployeeAvailabilityUseCase: ListEmployeeAvailabilityUseCase,
  ) {}

  @ApiTags('employee-availability')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Employee availability created',
    type: EmployeeAvailabilityResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Invalid or taken date range',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request error',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createEmployeeAvailability(
    @Body() data: CreateEmployeeAvailabilityDto,
  ) {
    return await this.createEmployeeAvailabilityUseCase.execute(data);
  }

  @ApiTags('employee-availability')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee availability listed',
    type: EmployeeAvailabilityResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request Error',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':employeeId')
  async listByEmployeeId(@Param('employeeId') id: string) {
    return await this.listEmployeeAvailabilityUseCase.execute(id);
  }
}
