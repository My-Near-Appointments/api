import { Appointment } from '@prisma/client';
import { AppointmentResponseDto } from 'src/modules/appointment/dtos/appointment-response.dto';

export class AppointmentMapper {
  static toResponse(appointment: Appointment): AppointmentResponseDto {
    return {
      id: appointment.id,
      start: appointment.start,
      end: appointment.end,
      companyId: appointment.companyId,
      employeeId: appointment.employeeId,
      userId: appointment.userId,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    };
  }
}
