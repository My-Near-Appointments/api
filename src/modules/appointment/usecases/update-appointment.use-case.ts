import { Inject, Injectable } from '@nestjs/common';
import { UpdateAppointmentDto } from 'src/modules/appointment/dtos/update-appointment.dto';
import { IAppointmentRepository } from 'src/modules/appointment/repositories/appointment.repository.interface';

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(id: string, updateAppointment: UpdateAppointmentDto) {
    return this.appointmentRepository.update(id, updateAppointment);
  }
}
