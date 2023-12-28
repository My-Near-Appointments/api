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
import { CompanyAdminGuard } from 'src/modules/shared/infra/guards/company-role.guard';

import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetCompanyByOwnerUseCase } from 'src/modules/company/usecases/get-company-by-owner.use-case';
import { GetCompanyByIdUseCase } from 'src/modules/company/usecases/get-company-by-id.use-case';

@Controller('v1/company')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly listCompanyUseCase: ListCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly toggleStatusUseCase: ToggleStatusUseCase,
    private readonly getCompanyByOwnerUseCase: GetCompanyByOwnerUseCase,
    private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase,
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
    description: 'Request error',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @Post()
  async createCompany(@Body() companyData: CreateCompanyDto) {
    return this.createCompanyUseCase.execute(companyData);
  }

  @ApiTags('company')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Company found by owner id',
    type: ICompanyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request errors',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @UseGuards(AuthGuard('jwt'), CompanyAdminGuard)
  @Get('/owner/:userId')
  async getCompanyByOwner(@Param('userId') userId: string) {
    return this.getCompanyByOwnerUseCase.execute(userId);
  }

  @ApiTags('company')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Company found by id',
    type: ICompanyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request errors',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getCompany(@Param('id') id: string) {
    return this.getCompanyByIdUseCase.execute(id);
  }

  @ApiTags('company')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Company updated',
    type: ICompanyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Company not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors',
  })
  @UseGuards(AuthGuard('jwt'), CompanyAdminGuard)
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
    status: HttpStatus.NOT_FOUND,
    description: 'Company not found',
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
    status: HttpStatus.NOT_FOUND,
    description: 'Company not found',
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
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async listCompanies() {
    return this.listCompanyUseCase.execute();
  }
}
