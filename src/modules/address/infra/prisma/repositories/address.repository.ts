import { Injectable } from '@nestjs/common';
import { Address } from 'src/modules/address/domain/address';
import { ICreateAddressDTO } from 'src/modules/address/dtos/create-address.dto';
import { IAddressRepository } from 'src/modules/address/repositories/address.repository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    streetName,
    zipCode,
    latitude,
    longitude,
    country,
  }: ICreateAddressDTO): Promise<Address> {
    const address = Address.create({
      streetName,
      zipCode,
      latitude,
      longitude,
      country,
    });

    return await this.prisma.address.create({
      data: Address.toPersistence(address),
    });
  }

  async find(id: string): Promise<Address> {
    const address = await this.prisma.address.findUnique({
      where: {
        id,
      },
    });

    return address;
  }

  async findAll(): Promise<Address[]> {
    const address = await this.prisma.address.findMany();

    return address;
  }
}
