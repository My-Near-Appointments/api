import { AppointmentRepository } from 'src/modules/appointment/infra/repositories/appointment.repository';

export const AppointmentProviders = [
  {
    provide: 'IAppointmentRepository',
    useClass: AppointmentRepository,
  },
];
