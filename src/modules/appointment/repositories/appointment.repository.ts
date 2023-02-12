import { Appointment } from 'src/modules/appointment/domain/appointment';
import { ICreateAppointmentDTO } from 'src/modules/appointment/dtos/create-appointment.dto';

export interface IAppointmentRepository {
  create(createAppointmentDTO: ICreateAppointmentDTO): Promise<Appointment>;
  find(id: string): Promise<Appointment>;
  findAll(): Promise<Appointment[]>;
}
