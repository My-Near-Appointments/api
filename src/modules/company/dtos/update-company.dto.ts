import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from 'src/modules/company/dtos/address.dto';
import { Type } from 'class-transformer';

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
    description: 'Company address',
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
