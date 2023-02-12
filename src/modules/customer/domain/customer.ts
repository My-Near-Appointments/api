import { ICreateCustomerDTO } from 'src/modules/customer/dtos/create-customer.dto';

export class Customer {
  id: string;
  name: string;
  email: string;
  addressId: string;

  private constructor({ name, email, addressId }: ICreateCustomerDTO) {
    this.name = name;
    this.email = email;
    this.addressId = addressId;
  }

  static validate({ name, email, addressId }: ICreateCustomerDTO): void {
    if (!name) {
      throw new Error('name is required');
    }

    if (!email) {
      throw new Error('email is required');
    }

    if (!addressId) {
      throw new Error('addressId is required');
    }
  }

  static create({ name, email, addressId }: ICreateCustomerDTO) {
    Customer.validate({
      name,
      email,
      addressId,
    });

    return new Customer({
      name,
      email,
      addressId,
    });
  }

  static toPersistence(customer: Customer): ICreateCustomerDTO {
    return {
      name: customer.name,
      addressId: customer.addressId,
      email: customer.email,
    };
  }
}
