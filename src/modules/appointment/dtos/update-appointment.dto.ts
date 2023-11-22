import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class UpdateAppointmentDto {
  @ApiProperty({
    description: 'Start date for the appointment',
  })
  @IsDate()
  @IsNotEmpty()
  start: Date;

  @ApiProperty({
    description: 'End date for the appointment',
  })
  @IsDate()
  @IsNotEmpty()
  end: Date;
}
