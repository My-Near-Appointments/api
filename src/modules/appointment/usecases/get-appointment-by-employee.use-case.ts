import { Inject, Injectable } from '@nestjs/common';
import { IAppointmentRepository } from 'src/modules/appointment/repositories/appointment.repository.interface';

@Injectable()
export class GetAppointmentByEmployeeUseCase {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(employeeId: string) {
    return this.appointmentRepository.getByEmployeeId(employeeId);
  }
}
