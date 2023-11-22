import { Inject, Injectable } from '@nestjs/common';
import { AppointmentResponseDto } from 'src/modules/appointment/dtos/appointment-response.dto';
import { IAppointmentRepository } from 'src/modules/appointment/repositories/appointment.repository.interface';

@Injectable()
export class DeleteAppointmentUseCase {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(id: string): Promise<AppointmentResponseDto> {
    return this.appointmentRepository.delete(id);
  }
}
