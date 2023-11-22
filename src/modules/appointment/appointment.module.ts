import { Module } from '@nestjs/common';
import { AppointmentController } from 'src/modules/appointment/controllers/appointment.controller';

@Module({
  providers: [],
  controllers: [AppointmentController],
  exports: [],
})
export class AppointmentModule {}
