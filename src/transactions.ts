import joi from 'joi';

import RaveBase from './rave';
import {
  TRANSACTION_VERIFY_URL,
  TRANSACTION_XREQUERY_URL,
  TRANSACTION_REFUND_URL,
  TRANSACTION_ALL_RECURRING_URL,
  TRANSACTION_STOP_RECURRING_URL,
  SCHEMA_OPTIONS,
} from './constants';
import { JoiSchema } from './types';

export interface RaveVerifyTransactionOptions {
  flw_ref?: string;
  tx_ref?: string;
}

export interface RaveQueryTransactionOptions
  extends RaveVerifyTransactionOptions {
  last_attempt: boolean;
  only_successful: boolean;
}

export interface RaveSingleRecurringOptions {
  txId: string;
}

export interface RaveStopRecurringOptions {
  id: string;
}

export interface RaveRefundOptions {
  ref: string;
}

class RaveTransactions {
  private readonly verifyEndpoint: string;
  private readonly queryEndpoint: string;
  private readonly refundEndPoint: string;
  private readonly allRecurringEndpoint: string;
  private readonly stopRecurringEndpoint: string;

  private raveBase: RaveBase;
  constructor(raveBase: RaveBase) {
    this.raveBase = raveBase;

    this.verifyEndpoint = this.raveBase.buildEndpoint(TRANSACTION_VERIFY_URL);
    this.queryEndpoint = this.raveBase.buildEndpoint(TRANSACTION_XREQUERY_URL);
    this.refundEndPoint = this.raveBase.buildEndpoint(TRANSACTION_REFUND_URL);
    this.allRecurringEndpoint = this.raveBase.buildEndpoint(
      TRANSACTION_ALL_RECURRING_URL,
    );
    this.stopRecurringEndpoint = this.raveBase.buildEndpoint(
      TRANSACTION_STOP_RECURRING_URL,
    );
  }

  async verify(options: RaveVerifyTransactionOptions) {
    const schema: JoiSchema<RaveVerifyTransactionOptions> = {
      flw_ref: joi
        .string()
        .trim()
        .when('tx_ref', {
          is: joi.required() /* exist() is more appropriate as an alias of required, but isn't yet typed */,
          otherwise: joi.required(),
        }),
      tx_ref: joi.string().trim(),
    };

    const { error, value } = joi.validate(options, schema, SCHEMA_OPTIONS);

    if (error) {
      throw error;
    }

    const payload = {
      ...value,
      SECKEY: this.raveBase.secretKey,
      normalize: 1,
    };

    return this.raveBase.post(this.verifyEndpoint, payload);
  }

  async query(options: RaveQueryTransactionOptions) {
    const schema: JoiSchema<RaveQueryTransactionOptions> = {
      flw_ref: joi
        .string()
        .trim()
        .when('tx_ref', {
          is: joi.required() /* exist() is more appropriate as an alias of required, but isn't yet typed */,
          otherwise: joi.required(),
        }),
      tx_ref: joi.string().trim(),
      last_attempt: joi
        .boolean()
        .truthy('1', 1)
        .falsy('0', 0),
      only_successful: joi
        .boolean()
        .truthy('1', 1)
        .falsy('0', 0),
    };

    const { error, value } = joi.validate(options, schema, SCHEMA_OPTIONS);

    if (error) {
      throw error;
    }

    const payload = {
      ...value,
      SECKEY: this.raveBase.secretKey,
    };

    return this.raveBase.post(this.queryEndpoint, payload);
  }

  async refund(options: RaveRefundOptions) {
    const schema: JoiSchema<RaveRefundOptions> = {
      ref: joi
        .string()
        .trim()
        .required(),
    };

    const { error, value } = joi.validate(options, schema, SCHEMA_OPTIONS);

    if (error) {
      throw error;
    }

    const payload = {
      ...value,
      seckey: this.raveBase.secretKey,
    };

    return this.raveBase.post(this.refundEndPoint, payload);
  }

  stopRecurringPayment(options: RaveStopRecurringOptions) {
    const schema: JoiSchema<RaveStopRecurringOptions> = {
      id: joi
        .string()
        .trim()
        .required(),
    };

    const { error, value } = joi.validate(options, schema, SCHEMA_OPTIONS);

    if (error) {
      throw error;
    }

    const payload = {
      ...value,
      seckey: this.raveBase.secretKey,
    };

    return this.raveBase.post(this.stopRecurringEndpoint, payload);
  }

  async listAllRecurringTransactions() {
    const payload = {
      seckey: this.raveBase.secretKey,
    };

    return this.raveBase.get(this.allRecurringEndpoint, payload);
  }

  async listSingleRecurringTransaction(options: RaveSingleRecurringOptions) {
    const schema: JoiSchema<RaveSingleRecurringOptions> = {
      txId: joi
        .string()
        .trim()
        .required(),
    };

    const { error, value } = joi.validate(options, schema, SCHEMA_OPTIONS);

    if (error) {
      throw error;
    }

    const payload = {
      ...value,
      seckey: this.raveBase.secretKey,
    };

    return this.raveBase.get(this.allRecurringEndpoint, payload);
  }
}

export default RaveTransactions;
