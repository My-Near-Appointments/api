import { AppointmentResponseDto } from 'src/modules/appointment/dtos/appointment-response.dto';
import { CreateAppointmentDto } from 'src/modules/appointment/dtos/create-appointment.dto';
import { AppointmentMapper } from 'src/modules/appointment/mappers/appointment.mapper';
import { IAppointmentRepository } from 'src/modules/appointment/repositories/appointment.repository.interface';

import { PrismaService } from 'src/prisma.service';

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
}
