import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Start date for the appointment',
  })
  @IsString()
  @IsNotEmpty()
  start: Date;

  @ApiProperty({
    description: 'End date for the appointment',
  })
  @IsString()
  @IsNotEmpty()
  end: Date;

  @ApiProperty({
    description: 'Id of the user responsible for the appointment',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Id of the employee asssigned for this appointment',
  })
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({
    description: 'Id of the company responsible for the employee',
  })
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
