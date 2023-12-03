import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dtos/update-user.dto';
import { UserCreatedResponseDto } from 'src/modules/user/dtos/user-created-response.dto';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';
import { CreateUserUseCase } from 'src/modules/user/usecases/create-user.use-case';
import { UpdateUserUseCase } from 'src/modules/user/usecases/update-user.use-case';

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {
    //
  }

  @ApiTags('user')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created',
    type: UserCreatedResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const result = await this.createUserUseCase.execute(userData);

    return { message: 'Usuário criado com sucesso', id: result.id };
  }

  @ApiTags('user')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User data retrieved',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Req() request) {
    return request.user;
  }

  @ApiTags('user')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User Updated',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Validation errors',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, userData);
  }
}
