import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from 'src/modules/appointment/dtos/create-appointment.dto';
import { IAppointmentRepository } from 'src/modules/appointment/repositories/appointment.repository.interface';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(createAppointment: CreateAppointmentDto) {
    const appointmentAlreadyCreated =
      await this.appointmentRepository.getUniqueByDate(
        createAppointment.employeeId,
        createAppointment.start,
        createAppointment.end,
      );

    if (appointmentAlreadyCreated) {
      throw new ConflictException('Este horário já foi marcado');
    }

    return this.appointmentRepository.create(createAppointment);
  }
}
