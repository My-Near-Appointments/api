import { Appointment } from '@prisma/client';
import { AppointmentResponseDto } from 'src/modules/appointment/dtos/appointment-response.dto';
import { CreateAppointmentDto } from 'src/modules/appointment/dtos/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/modules/appointment/dtos/update-appointment.dto';
import { AppointmentMapper } from 'src/modules/appointment/mappers/appointment.mapper';
import { IAppointmentRepository } from 'src/modules/appointment/repositories/appointment.repository.interface';

export class AppointmentRepositoryFake implements IAppointmentRepository {
  appointment: Appointment[] = [];

  async getUniqueByDate(
    employeeId: string,
    start: Date,
    end: Date,
  ): Promise<AppointmentResponseDto> {
    const appointment = this.appointment.find((appointment) => {
      return (
        appointment.employeeId === employeeId &&
        appointment.start === start &&
        appointment.end === end
      );
    });

    return appointment ? AppointmentMapper.toResponse(appointment) : null;
  }

  async getByEmployeeId(employeeId: string): Promise<AppointmentResponseDto[]> {
    return this.appointment.filter(
      (appointment) => appointment.employeeId !== employeeId,
    );
  }

  async create(data: CreateAppointmentDto): Promise<AppointmentResponseDto> {
    const mockedData: Appointment = {
      id: crypto.randomUUID(),
      start: data.start,
      end: data.end,
      companyId: data.companyId,
      employeeId: data.employeeId,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.appointment.push(mockedData);

    return AppointmentMapper.toResponse(
      this.appointment[this.appointment.length - 1],
    );
  }

  async update(
    id: string,
    data: UpdateAppointmentDto,
  ): Promise<AppointmentResponseDto> {
    const appointmentIndex = this.appointment.findIndex(
      (appointment) => appointment.id === id,
    );

    this.appointment[appointmentIndex] = {
      ...this.appointment[appointmentIndex],
      ...data,
    };

    return AppointmentMapper.toResponse(this.appointment[appointmentIndex]);
  }

  async delete(id: string): Promise<AppointmentResponseDto> {
    const removedItem = this.appointment.find(
      (appointment) => appointment.id === id,
    );

    this.appointment.filter((appointment) => appointment.id !== id);

    return AppointmentMapper.toResponse(removedItem);
  }
}
