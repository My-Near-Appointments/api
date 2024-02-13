import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { AppointmentResponseDto } from 'src/modules/appointment/dtos/appointment-response.dto';
import { CreateAppointmentDto } from 'src/modules/appointment/dtos/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/modules/appointment/dtos/update-appointment.dto';
import { CreateAppointmentUseCase } from 'src/modules/appointment/usecases/create-appointment.use-case';
import { DeleteAppointmentUseCase } from 'src/modules/appointment/usecases/delete-appointment.use-case';
import { UpdateAppointmentUseCase } from 'src/modules/appointment/usecases/update-appointment.use-case';
import { GetAppointmentByEmployeeUseCase } from 'src/modules/appointment/usecases/get-appointment-by-employee.use-case';

@Controller('v1/appointment')
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
    private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
    private readonly getAppointmentByEmployeeUseCase: GetAppointmentByEmployeeUseCase,
  ) {}

  @ApiTags('appointment')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved list of appointments by employeeId',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server errors',
  })
  @Get(':employeeId')
  async getByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.getAppointmentByEmployeeUseCase.execute(employeeId);
  }

  @ApiTags('appointment')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Appointment created',
    type: AppointmentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @Post()
  async createAppointment(@Body() data: CreateAppointmentDto) {
    return this.createAppointmentUseCase.execute(data);
  }

  @ApiTags('appointment')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Appointment updated',
    type: AppointmentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @Put(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() data: UpdateAppointmentDto,
  ) {
    return this.updateAppointmentUseCase.execute(id, data);
  }

  @ApiTags('appointment')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Appointment deleted',
    type: AppointmentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    return this.deleteAppointmentUseCase.execute(id);
  }
}
