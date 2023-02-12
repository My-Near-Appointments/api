import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/modules/appointment/domain/appointment';
import { ICreateAppointmentDTO } from 'src/modules/appointment/dtos/create-appointment.dto';
import { IAppointmentRepository } from 'src/modules/appointment/repositories/appointment.repository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    companyId,
    customerId,
    date,
    serviceProviderId,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = Appointment.create(
      customerId,
      companyId,
      serviceProviderId,
      date,
    );

    return await this.prisma.appointment.create({
      data: Appointment.toPersistence(appointment),
    });
  }

  async find(id: string): Promise<Appointment> {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = this.prisma.appointment.findMany();

    return appointments;
  }
}
