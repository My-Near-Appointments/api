import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';
import { CreateCompanyUseCase } from 'src/modules/company/usecases/create-company.use-case';
import { ListCompanyUseCase } from 'src/modules/company/usecases/list-company.usecase';
import { UpdateCompanyUseCase } from 'src/modules/company/usecases/update-company.use-case';
import { ToggleStatusUseCase } from 'src/modules/company/usecases/toggle-status.use-case';
import { UpdateCompanyDto } from 'src/modules/company/dtos/update-company.dto';

import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/company')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly listCompanyUseCase: ListCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly toggleStatusUseCase: ToggleStatusUseCase,
  ) {
    //
  }

  @ApiTags('company')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Company successfully created',
    type: ICompanyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCompany(@Body() companyData: CreateCompanyDto) {
    return this.createCompanyUseCase.execute(companyData);
  }

  @ApiTags('company')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Company updated',
    type: ICompanyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() companyData: UpdateCompanyDto,
  ) {
    return this.updateCompanyUseCase.execute(id, companyData);
  }

  @ApiTags('company')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Company deactivated',
    type: ICompanyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('/deactivate/:id')
  async deactivateCompany(@Param('id') id: string) {
    return this.toggleStatusUseCase.execute(id, false);
  }

  @ApiTags('company')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Company activated',
    type: ICompanyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('/activate/:id')
  async activateCompany(@Param('id') id: string) {
    return this.toggleStatusUseCase.execute(id, true);
  }

  @ApiTags('company')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Company list retrieved',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async listCompanies() {
    return this.listCompanyUseCase.execute();
  }
}
