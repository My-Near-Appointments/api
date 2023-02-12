import { Module } from '@nestjs/common';
import { AddressController } from 'src/modules/address/controllers/address.controller';
import { AddressRepository } from 'src/modules/address/infra/prisma/repositories/address.repository';
import { CreateAddressService } from 'src/modules/address/services/create-address.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    { provide: 'IAddressRepository', useClass: AddressRepository },
    CreateAddressService,
    PrismaService,
  ],
  controllers: [AddressController],
})
export class AddressModule {}
