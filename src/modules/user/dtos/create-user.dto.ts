import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

const possibleRoles = ['Customer', 'CompanyAdmin'];

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsStrongPassword({ minLength: 8, minSymbols: 1, minUppercase: 1 })
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsIn(possibleRoles)
  @IsNotEmpty()
  @ApiProperty()
  userRole: string;
}
