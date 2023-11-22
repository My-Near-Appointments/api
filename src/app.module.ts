import { Module } from '@nestjs/common';
import { CompanyModule } from 'src/modules/company/company.module';
import { UserModule } from 'src/modules/user/user.module';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/infra/strategies/jwt.strategy';
import { EmployeeModule } from 'src/modules/employee/employee.module';
import { AppointmentModule } from 'src/modules/appointment/appointment.module';

@Module({
  imports: [
    CompanyModule,
    UserModule,
    AuthModule,
    EmployeeModule,
    AppointmentModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: {
        expiresIn: '4h',
      },
    }),
  ],
  controllers: [],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule {}
