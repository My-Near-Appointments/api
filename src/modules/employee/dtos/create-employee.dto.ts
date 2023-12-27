import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Name of the employee',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Photo for the employee',
  })
  @IsUrl()
  @IsNotEmpty()
  photoLink: string;

  @ApiProperty({
    description: 'Company responsible for the employee',
  })
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
