import { ICreateAppointmentDTO } from 'src/modules/appointment/dtos/create-appointment.dto';

export class Appointment {
  id: string;
  customerId: string;
  companyId: string;
  serviceProviderId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;

  private constructor(
    customerId: string,
    companyId: string,
    serviceProviderId: string,
    date: Date,
  ) {
    this.customerId = customerId;
    this.companyId = companyId;
    this.serviceProviderId = serviceProviderId;
    this.date = date;
  }

  static validate(
    customerId: string,
    companyId: string,
    serviceProviderId: string,
    date: Date,
  ): void {
    if (!customerId) {
      throw new Error('customerId is required');
    }

    if (!companyId) {
      throw new Error('companyId is required');
    }

    if (!serviceProviderId) {
      throw new Error('serviceProviderId is required');
    }

    if (!date) {
      throw new Error('date is required');
    }
  }

  static create(
    customerId: string,
    companyId: string,
    serviceProviderId: string,
    date: Date,
  ) {
    Appointment.validate(customerId, companyId, serviceProviderId, date);

    return new Appointment(customerId, companyId, serviceProviderId, date);
  }

  static toPersistence(appointment: Appointment): ICreateAppointmentDTO {
    return {
      customerId: appointment.customerId,
      companyId: appointment.companyId,
      serviceProviderId: appointment.serviceProviderId,
      date: appointment.date,
    };
  }
}
