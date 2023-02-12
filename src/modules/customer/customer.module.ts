import { Module } from '@nestjs/common';
import { CustomerController } from 'src/modules/customer/controllers/customer.controller';
import { CustomerRepository } from 'src/modules/customer/infra/prisma/repositories/customer.repository';
import { CreateCustomerService } from 'src/modules/customer/services/create-customer.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
    CreateCustomerService,
    PrismaService,
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
