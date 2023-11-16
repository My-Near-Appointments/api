import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({
    description: 'Name of the company',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description text to be shown in the company page',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Latitude data about the company',
  })
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @ApiProperty({
    description: 'Longitude data about the company',
  })
  @IsNumber()
  @IsNotEmpty()
  long: number;
}
