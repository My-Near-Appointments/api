import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/modules/address/domain/address';
import { ICreateAddressDTO } from 'src/modules/address/dtos/create-address.dto';
import { IAddressRepository } from 'src/modules/address/repositories/address.repository';

@Injectable()
export class CreateAddressService {
  constructor(
    @Inject('IAddressRepository')
    private addressrRepository: IAddressRepository,
  ) {}

  async execute(createCustomerDTO: ICreateAddressDTO): Promise<Address> {
    const address = await this.addressrRepository.create(createCustomerDTO);

    return address;
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.addressrRepository.findAll();

    return addresses;
  }
}
