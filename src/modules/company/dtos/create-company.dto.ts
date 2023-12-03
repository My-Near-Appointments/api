import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from 'src/modules/company/dtos/address.dto';
import { Type } from 'class-transformer';

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
    description: 'Company address',
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
