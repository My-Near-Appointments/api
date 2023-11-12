import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { CreateUserUseCase } from 'src/modules/user/usecases/create-user.use-case';

@Controller('v1/user')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    //
  }

  @ApiTags('user')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.createUserUseCase.execute(userData);
  }
}
