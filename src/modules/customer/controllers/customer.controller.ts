import { Body, Controller, Get, Post } from '@nestjs/common';
import { Customer } from 'src/modules/customer/domain/customer';
import { ICreateCustomerDTO } from 'src/modules/customer/dtos/create-customer.dto';
import { CreateCustomerService } from 'src/modules/customer/services/create-customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CreateCustomerService) {}

  @Post()
  async create(
    @Body() createCustomerDTO: ICreateCustomerDTO,
  ): Promise<Customer> {
    const customer = await this.customerService.execute(createCustomerDTO);

    return customer;
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    const customers = await this.customerService.findAll();

    return customers;
  }
}
