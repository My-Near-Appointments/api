import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentResponseDto } from 'src/modules/appointment/dtos/appointment-response.dto';
import { CreateAppointmentDto } from 'src/modules/appointment/dtos/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/modules/appointment/dtos/update-appointment.dto';
import { AppointmentMapper } from 'src/modules/appointment/mappers/appointment.mapper';
import { IAppointmentRepository } from 'src/modules/appointment/repositories/appointment.repository.interface';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateAppointmentDto): Promise<AppointmentResponseDto> {
    const appointment = await this.prismaService.appointment.create({
      data: {
        start: data.start,
        end: data.end,
        user: { connect: { id: data.userId } },
        company: { connect: { id: data.companyId } },
        employee: { connect: { id: data.employeeId } },
      },
    });

    return AppointmentMapper.toResponse(appointment);
  }

  async update(
    id: string,
    data: UpdateAppointmentDto,
  ): Promise<AppointmentResponseDto> {
    const appointmentExists = await this.prismaService.appointment.findUnique({
      where: { id },
    });

    if (!appointmentExists) {
      throw new NotFoundException('Appointment not found');
    }

    const appointment = await this.prismaService.appointment.update({
      where: { id },
      data: {
        start: data.start,
        end: data.end,
      },
    });

    return AppointmentMapper.toResponse(appointment);
  }

  async delete(id: string): Promise<AppointmentResponseDto> {
    const appointmentExists = await this.prismaService.appointment.findUnique({
      where: { id },
    });

    if (!appointmentExists) {
      throw new NotFoundException('Appointment not found');
    }

    await this.prismaService.appointment.delete({ where: { id } });

    return AppointmentMapper.toResponse(appointmentExists);
  }
}
