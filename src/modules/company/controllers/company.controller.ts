import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';
import { ICompanyResponseDto } from 'src/modules/company/dtos/company-response.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

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
@Controller('v1/company')
export class CompanyController {
  @Post()
  async createCompany(@Body() companyData: CreateCompanyDto) {
    return companyData;
  }
}
