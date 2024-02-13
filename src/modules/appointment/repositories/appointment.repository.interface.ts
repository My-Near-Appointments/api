import { AppointmentResponseDto } from 'src/modules/appointment/dtos/appointment-response.dto';
import { CreateAppointmentDto } from 'src/modules/appointment/dtos/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/modules/appointment/dtos/update-appointment.dto';

export interface IAppointmentRepository {
  create(data: CreateAppointmentDto): Promise<AppointmentResponseDto>;
  getByEmployeeId(employeeId: string): Promise<AppointmentResponseDto[]>;
  getUniqueByDate(
    employeeId: string,
    start: Date,
    end: Date,
  ): Promise<AppointmentResponseDto>;
  update(
    id: string,
    data: UpdateAppointmentDto,
  ): Promise<AppointmentResponseDto>;
  delete(id: string): Promise<AppointmentResponseDto>;
}
