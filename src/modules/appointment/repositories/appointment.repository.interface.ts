import { AppointmentResponseDto } from 'src/modules/appointment/dtos/appointment-response.dto';
import { CreateAppointmentDto } from 'src/modules/appointment/dtos/create-appointment.dto';

export interface IAppointmentRepository {
  create(data: CreateAppointmentDto): Promise<AppointmentResponseDto>;
}
