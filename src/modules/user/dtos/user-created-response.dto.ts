import { ApiProperty } from '@nestjs/swagger';

export class UserCreatedResponseDto {
  @ApiProperty({
    description: 'Id of the user created',
    example: '1fc86003-22d6-4bcf-acbc-f29ef3a8261a',
    readOnly: true,
    default: 'Default ID',
    format: 'uuid',
    minLength: 36,
    maxLength: 36,
  })
  id: string;
}
