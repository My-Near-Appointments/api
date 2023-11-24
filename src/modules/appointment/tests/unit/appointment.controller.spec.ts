import { Test, TestingModule } from '@nestjs/testing';

import { AppointmentController } from 'src/modules/appointment/controllers/appointment.controller';
import { CreateAppointmentDto } from 'src/modules/appointment/dtos/create-appointment.dto';
import { AppointmentRepositoryFake } from 'src/modules/appointment/repositories/fakes/appointment.repository.fake';
import { CreateAppointmentUseCase } from 'src/modules/appointment/usecases/create-appointment.use-case';
import { DeleteAppointmentUseCase } from 'src/modules/appointment/usecases/delete-appointment.use-case';
import { UpdateAppointmentUseCase } from 'src/modules/appointment/usecases/update-appointment.use-case';
import { CompanyAdminGuardFake } from 'src/modules/shared/fakes/guards/company-role.guard';
import { CompanyAdminGuard } from 'src/modules/shared/infra/guards/company-role.guard';

describe('#Unit - AppointmentController', () => {
  let appointmentController: AppointmentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        CreateAppointmentUseCase,
        UpdateAppointmentUseCase,
        DeleteAppointmentUseCase,
        {
          provide: 'IAppointmentRepository',
          useClass: AppointmentRepositoryFake,
        },
      ],
    })
      .overrideGuard(CompanyAdminGuard)
      .useClass(CompanyAdminGuardFake)
      .compile();

    appointmentController = app.get<AppointmentController>(
      AppointmentController,
    );
  });

  describe('createAppointment', () => {
    it('should be able to create an appointment', async () => {
      const mockedApppointment: CreateAppointmentDto = {
        start: new Date(),
        end: new Date(),
        companyId: '1',
        userId: '1',
        employeeId: '1',
      };

      const result = await appointmentController.createAppointment(
        mockedApppointment,
      );

      expect(result).toHaveProperty('id');
      expect(result.companyId).toBe(mockedApppointment.companyId);
    });
  });

  describe('updateAppointment', () => {
    it('should be able to update an appointment', async () => {
      const mockedApppointment: CreateAppointmentDto = {
        start: new Date(),
        end: new Date(),
        companyId: '1',
        userId: '1',
        employeeId: '1',
      };

      const createdAppointment = await appointmentController.createAppointment(
        mockedApppointment,
      );

      const updatedStartDate = new Date();
      const updatedEndDate = new Date();

      const result = await appointmentController.updateAppointment(
        createdAppointment.id,
        {
          start: updatedStartDate,
          end: updatedEndDate,
        },
      );

      expect(result).toHaveProperty('id');
      expect(result.start).toBe(updatedStartDate);
      expect(result.end).toBe(updatedEndDate);
    });
  });

  describe('deleteAppointment', () => {
    it('should be able to delete an appointment', async () => {
      const mockedApppointment: CreateAppointmentDto = {
        start: new Date(),
        end: new Date(),
        companyId: '1',
        userId: '1',
        employeeId: '1',
      };

      const createdAppointment = await appointmentController.createAppointment(
        mockedApppointment,
      );

      const result = await appointmentController.deleteAppointment(
        createdAppointment.id,
      );

      expect(result).toHaveProperty('id');
    });
  });
});
