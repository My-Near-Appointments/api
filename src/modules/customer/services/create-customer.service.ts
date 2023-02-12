import { Inject, Injectable } from '@nestjs/common';
import { Customer } from 'src/modules/customer/domain/customer';
import { ICreateCustomerDTO } from 'src/modules/customer/dtos/create-customer.dto';
import { ICustomerRepository } from 'src/modules/customer/repositories/customer.repository';

@Injectable()
export class CreateCustomerService {
  constructor(
    @Inject('ICustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  async execute(createCustomerDTO: ICreateCustomerDTO): Promise<Customer> {
    const customer = await this.customerRepository.create(createCustomerDTO);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll();

    return customers;
  }
}
