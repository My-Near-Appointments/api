import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeAvailabilityDto {
  @ApiProperty({
    description: 'Availability start date',
  })
  @IsString()
  @IsNotEmpty()
  start: Date;

  @ApiProperty({
    description: 'Availability end date',
  })
  @IsString()
  @IsNotEmpty()
  end: Date;
}
