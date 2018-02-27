import joi from 'joi';

import RaveBase from './rave';
import {
  VALIDATION_CARD_URL,
  VALIDATION_BANK_URL,
  SCHEMA_OPTIONS,
} from './constants';
import { JoiSchema } from './types';

export interface RaveValidationOptions {
  transactionreference: string;
  otp: string;
}

class RaveValidation {
  private bankValidationEndpoint: string;
  private cardValidationEndpoint: string;
  private raveBase: RaveBase;

  constructor(raveBase: RaveBase) {
    this.raveBase = raveBase;

    this.cardValidationEndpoint = this.raveBase.buildEndpoint(
      VALIDATION_CARD_URL,
    );
    this.bankValidationEndpoint = this.raveBase.buildEndpoint(
      VALIDATION_BANK_URL,
    );
  }

  private validate(options: RaveValidationOptions) {
    const schema: JoiSchema<RaveValidationOptions> = {
      transactionreference: joi
        .string()
        .trim()
        .required(),
      otp: joi
        .string()
        .trim()
        .required(),
    };

    const { error, value } = joi.validate(options, schema, SCHEMA_OPTIONS);

    if (error) {
      throw error;
    }

    return value;
  }

  async cardTransaction(options: RaveValidationOptions) {
    const value = this.validate(options);
    const payload = {
      ...value,
      PBFPubKey: this.raveBase.publicKey,
    };

    return this.raveBase.post(this.cardValidationEndpoint, payload);
  }

  async bankTransaction(options: RaveValidationOptions) {
    const value = this.validate(options);
    const payload = {
      ...value,
      PBFPubKey: this.raveBase.publicKey,
    };

    return this.raveBase.post(this.bankValidationEndpoint, payload);
  }
}

export default RaveValidation;
