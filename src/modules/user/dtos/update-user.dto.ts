import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsStrongPassword()
  @IsStrongPassword({ minLength: 8, minSymbols: 1, minUppercase: 1 })
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
