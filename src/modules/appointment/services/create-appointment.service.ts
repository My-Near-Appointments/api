import { Inject, Injectable } from '@nestjs/common';
import { Appointment } from 'src/modules/appointment/domain/appointment';
import { ICreateAppointmentDTO } from 'src/modules/appointment/dtos/create-appointment.dto';
import { IAppointmentRepository } from 'src/modules/appointment/repositories/appointment.repository';

@Injectable()
export class CreateAppointmentService {
  constructor(
    @Inject('IAppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(
    createAppointmentDTO: ICreateAppointmentDTO,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.create(
      createAppointmentDTO,
    );

    return appointment;
  }
}
