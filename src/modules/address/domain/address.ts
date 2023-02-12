import { ICreateAddressDTO } from 'src/modules/address/dtos/create-address.dto';

export class Address {
  streetName: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  country: string;

  private constructor({
    streetName,
    zipCode,
    latitude,
    longitude,
    country,
  }: ICreateAddressDTO) {
    this.streetName = streetName;
    this.zipCode = zipCode;
    this.latitude = latitude;
    this.longitude = longitude;
    this.country = country;
  }

  static validate({
    streetName,
    zipCode,
    latitude,
    longitude,
    country,
  }: ICreateAddressDTO): void {
    if (!streetName) {
      throw new Error('streetName is required');
    }

    if (!zipCode) {
      throw new Error('zipCode is required');
    }

    if (!latitude) {
      throw new Error('latitude is required');
    }

    if (!longitude) {
      throw new Error('longitude is required');
    }

    if (!country) {
      throw new Error('country is required');
    }
  }

  static create({
    streetName,
    zipCode,
    latitude,
    longitude,
    country,
  }: ICreateAddressDTO) {
    Address.validate({
      streetName,
      zipCode,
      latitude,
      longitude,
      country,
    });

    return new Address({
      streetName,
      zipCode,
      latitude,
      longitude,
      country,
    });
  }

  static toPersistence(address: Address): ICreateAddressDTO {
    return {
      streetName: address.streetName,
      zipCode: address.zipCode,
      latitude: address.latitude,
      longitude: address.longitude,
      country: address.country,
    };
  }
}
