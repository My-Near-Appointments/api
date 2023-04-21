import { Module } from '@nestjs/common';
import { AddressModule } from 'src/modules/address/address.module';
import { AppointmentModule } from 'src/modules/appointment/appointment.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { PrismaService } from 'src/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppointmentModule, CustomerModule, AddressModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
