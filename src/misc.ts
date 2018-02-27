import joi from 'joi';

import RaveBase from './rave';
import { JoiSchema } from './types';
import {
  SCHEMA_OPTIONS,
  MISC_GET_FEES_URL,
  MISC_LIST_BANKS_URL,
  MISC_EXCHANGE_RATE_URL,
} from './constants';

export interface RaveMiscGetFeeOptions {
  amount: string | number;
  currency: string;
  ptype?: string;
  card6?: string;
}

export interface RaveMiscForexOptions {
  origin_currency: string;
  destination_currency: string;
  amount?: string | number;
}

class RaveMiscellaneous {
  public exchangeEndpoint: string;
  private listBanksEndpoint: string;
  private getFeesEndpoint: string;
  private raveBase: RaveBase;
  constructor(raveBase: RaveBase) {
    this.raveBase = raveBase;

    this.getFeesEndpoint = this.raveBase.buildEndpoint(MISC_GET_FEES_URL);
    this.listBanksEndpoint = this.raveBase.buildEndpoint(MISC_LIST_BANKS_URL);
    this.exchangeEndpoint = this.raveBase.buildEndpoint(MISC_EXCHANGE_RATE_URL);
  }

  async getFees(options: RaveMiscGetFeeOptions) {
    const schema: JoiSchema<RaveMiscGetFeeOptions> = {
      amount: joi
        .number()
        .required()
        .greater(0)
        .required(),
      currency: joi
        .string()
        .uppercase()
        .min(2)
        .default('NGN')
        .required(),
      ptype: joi.any(),
      card6: joi.string().length(6),
    };

    const { error, value } = joi.validate(options, schema, SCHEMA_OPTIONS);

    if (error) {
      throw error;
    }

    const payload = {
      ...value,
      PBFPubKey: this.raveBase.publicKey,
    };

    return this.raveBase.post(this.getFeesEndpoint, payload);
  }

  async listBanks() {
    const payload = { json: 1 };

    return this.raveBase.get(this.listBanksEndpoint, payload);
  }

  async exchange(options: RaveMiscForexOptions) {
    const currencySchema = joi
      .string()
      .uppercase()
      .min(2)
      .required();

    const schema: JoiSchema<RaveMiscForexOptions> = {
      origin_currency: currencySchema,
      destination_currency: currencySchema,
      amount: joi
        .number()
        .required()
        .greater(0),
    };

    const { error, value } = joi.validate(options, schema, SCHEMA_OPTIONS);

    if (error) {
      throw error;
    }

    const payload = {
      ...value,
      PBFPubKey: this.raveBase.publicKey,
    };

    return this.raveBase.post(this.exchangeEndpoint, payload);
  }
}

export default RaveMiscellaneous;
