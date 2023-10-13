import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDto } from 'src/modules/company/dtos/create-company.dto';

@Controller('v1/company')
export class CompanyController {
  @Post()
  async createCompany(@Body() companyData: CreateCompanyDto) {
    console.log(companyData);
    return companyData;
  }
}
