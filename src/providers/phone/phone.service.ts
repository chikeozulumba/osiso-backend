import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  PhoneNumber,
  PhoneNumberFormat,
  PhoneNumberUtil,
} from 'google-libphonenumber';

/**
 * @name PhoneNumberService
 * @description Class for handling validating and formatting phone number input
 *
 * @export
 * @class PhoneNumberService
 */
@Injectable()
export class PhoneNumberService {
  public phoneUtil: PhoneNumberUtil = PhoneNumberUtil.getInstance();
  public number: PhoneNumber;
  public rawPhoneNumber: string;
  public countryCode: string;

  /**
   * @name parsePhoneNumber
   * @description Method for parsing phone number input
   *
   * @param {string} [number=null]
   * @param {string} [countryCode='NG']
   * @return {*}
   * @memberof PhoneNumberService
   */
  parsePhoneNumber(
    number: string = null,
    countryCode = 'NG',
  ): PhoneNumberService {
    this.rawPhoneNumber = number;
    this.countryCode = countryCode;

    try {
      this.number = this.phoneUtil.parseAndKeepRawInput(
        this.rawPhoneNumber,
        this.countryCode,
      );
      return this;
    } catch (error) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        errors: {
          phoneNumber: 'Invalid phone number.',
        },
      });
    }
  }

  /**
   * @name validateNumber
   * @description Method for validating phone number input
   *
   * @param {boolean} [throwError=false]
   * @return {PhoneNumberService}
   * @memberof PhoneNumberService
   */
  validateNumber({
    throwError = false,
    number,
  }: {
    number?: PhoneNumber;
    throwError?: boolean;
  } = {}): { check: boolean; instance: PhoneNumberService } {
    const check = this.phoneUtil.isValidNumber(this.number);
    if (number) {
      this.number = number;
    }
    if (throwError && !check) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        errors: {
          phoneNumber: 'Invalid phone number.',
        },
      });
    }
    return { check, instance: this };
  }

  /**
   * @name formatNumberPNF
   * @description Format phone number to PNF format
   * @return {*} this
   * @memberof PhoneNumberService
   */
  formatNumberPNF() {
    return this.phoneUtil.format(this.number, PhoneNumberFormat.E164);
  }

  /**
   * @name formatNumberNationalNumber
   * @description Format phone number to National number format
   * @return {*}  {string}
   * @memberof PhoneNumberService
   */
  formatNumberNationalNumber(): string {
    return this.number.getNationalNumber().toString();
  }
}
