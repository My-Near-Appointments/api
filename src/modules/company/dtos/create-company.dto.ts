import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Name of the company',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Brazilian CNPJ registration for the company',
  })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({
    description: 'Description text to be shown in the company page',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Admistrator id responsible for the company',
  })
  @IsString()
  @IsNotEmpty()
  adminId: string;

  @ApiProperty({
    description: 'Company email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
