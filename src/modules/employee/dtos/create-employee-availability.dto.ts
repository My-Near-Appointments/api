import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeAvailabilityDto {
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

  @ApiProperty({
    description: 'Id of the employee',
  })
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({
    description: 'Id of the company',
  })
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
