import { Module } from '@nestjs/common';
import { AppointmentRepository } from 'src/modules/appointment/infra/prisma/repositories/appointment.repository';
import { CreateAppointmentService } from 'src/modules/appointment/services/create-appointment.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    { provide: 'IAppointmentRepository', useClass: AppointmentRepository },
    CreateAppointmentService,
    PrismaService,
  ],
})
export class AppointmentModule {}
