import { Customer } from 'src/modules/customer/domain/customer';
import { ICreateCustomerDTO } from 'src/modules/customer/dtos/create-customer.dto';

export interface ICustomerRepository {
  create(createCustomerDTO: ICreateCustomerDTO): Promise<Customer>;
  find(id: string): Promise<Customer>;
  findAll(): Promise<Customer[]>;
}
