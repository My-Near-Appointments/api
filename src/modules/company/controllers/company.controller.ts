import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateCompanyUseCase } from 'src/modules/company/usecases/create-company.use-case';

@Controller('v1/company')
export class CompanyController {
  constructor(private createCompanyUseCase: CreateCompanyUseCase) {
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
  @Post()
  async createCompany(@Body() companyData: CreateCompanyDto) {
    return this.createCompanyUseCase.execute(companyData);
  }
}
