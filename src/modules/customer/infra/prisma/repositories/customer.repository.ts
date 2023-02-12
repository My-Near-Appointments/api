import { Injectable } from '@nestjs/common';
import { Customer } from 'src/modules/customer/domain/customer';
import { ICreateCustomerDTO } from 'src/modules/customer/dtos/create-customer.dto';
import { ICustomerRepository } from 'src/modules/customer/repositories/customer.repository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    addressId,
    email,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = Customer.create({
      name,
      addressId,
      email,
    });

    return await this.prisma.customer.create({
      data: Customer.toPersistence(customer),
    });
  }

  async find(id: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customer = await this.prisma.customer.findMany();

    return customer;
  }
}
