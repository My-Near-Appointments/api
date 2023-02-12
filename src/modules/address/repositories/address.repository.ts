import { Address } from 'src/modules/address/domain/address';
import { ICreateAddressDTO } from 'src/modules/address/dtos/create-address.dto';

export interface IAddressRepository {
  create(createAddressDTO: ICreateAddressDTO): Promise<Address>;
  find(id: string): Promise<Address>;
  findAll(): Promise<Address[]>;
}
