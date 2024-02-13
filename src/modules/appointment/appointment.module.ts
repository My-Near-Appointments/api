import { Module } from '@nestjs/common';
import { AppointmentController } from 'src/modules/appointment/controllers/appointment.controller';
import { AppointmentProviders } from 'src/modules/appointment/providers/appointment.providers';
import { CreateAppointmentUseCase } from 'src/modules/appointment/usecases/create-appointment.use-case';
import { DeleteAppointmentUseCase } from 'src/modules/appointment/usecases/delete-appointment.use-case';
import { GetAppointmentByEmployeeUseCase } from 'src/modules/appointment/usecases/get-appointment-by-employee.use-case';
import { UpdateAppointmentUseCase } from 'src/modules/appointment/usecases/update-appointment.use-case';

import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [...AppointmentProviders],
  controllers: [AppointmentController],
  providers: [
    PrismaService,
    ...AppointmentProviders,
    CreateAppointmentUseCase,
    UpdateAppointmentUseCase,
    DeleteAppointmentUseCase,
    GetAppointmentByEmployeeUseCase,
  ],
})
export class AppointmentModule {}
