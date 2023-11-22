import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateAppointmentDto } from 'src/modules/appointment/dtos/create-appointment.dto';
import { CreateAppointmentUseCase } from 'src/modules/appointment/usecases/create-appointment.use-case';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';

@Controller('v1/appointment')
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
  ) {}

  @ApiTags('appointment')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Appointment created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @Post()
  async create(@Body() data: CreateAppointmentDto) {
    return this.createAppointmentUseCase.execute(data);
  }
}
