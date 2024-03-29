import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateEmployeeDto {
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
}
