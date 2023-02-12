import { Body, Controller, Get, Post } from '@nestjs/common';
import { Address } from 'src/modules/address/domain/address';
import { ICreateAddressDTO } from 'src/modules/address/dtos/create-address.dto';
import { CreateAddressService } from 'src/modules/address/services/create-address.service';

@Controller('address')
export class AddressController {
  constructor(private addressService: CreateAddressService) {}

  @Post()
  async create(@Body() createAdressDTO: ICreateAddressDTO): Promise<Address> {
    const address = await this.addressService.execute(createAdressDTO);

    return address;
  }

  @Get()
  async findAll(): Promise<Address[]> {
    const addresses = await this.addressService.findAll();

    return addresses;
  }
}
