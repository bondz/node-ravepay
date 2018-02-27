import joi from 'joi';

import RaveBase from '../rave';
import { RaveCardPaymentOptions, CardPayment } from '../paymentMethods';
import {
  ENCRYPTION_ALGO,
  DIRECT_CHARGE_URL,
  PREAUTH_CAPTURE_URL,
  PREAUTH_REFUNDORVOID_URL,
  SCHEMA_OPTIONS,
} from '../constants';
import { generateIntegrityHash } from '../security';
import { JoiSchema } from '../types';

export interface RaveFlutterRef {
  flwRef: string;
}

class RaveCardPreauth {
  private preauthRefundVoidEndpoint: string;
  private preauthCaptureEndpoint: string;
  private raveBase: RaveBase;
  private preauthEndpoint: string;

  constructor(raveBase: RaveBase) {
    this.raveBase = raveBase;

    this.preauthEndpoint = this.raveBase.buildEndpoint(DIRECT_CHARGE_URL);
    this.preauthCaptureEndpoint = this.raveBase.buildEndpoint(
      PREAUTH_CAPTURE_URL,
    );
    this.preauthRefundVoidEndpoint = this.raveBase.buildEndpoint(
      PREAUTH_REFUNDORVOID_URL,
    );
  }

  private preparePreauth(payload: any) {
    const alg = ENCRYPTION_ALGO;
    const PBFPubKey = this.raveBase.publicKey;
    const obj = {
      ...payload,
      PBFPubKey,
      charge_type: 'preauth',
    };

    if (this.raveBase.generateIntegrity) {
      const integrity = generateIntegrityHash(this.raveBase.secretKey, obj);

      obj.QUERY_STRING_DATA = { ...obj };
      obj.QUERY_STRING_DATA.integrity_hash = integrity;
    }

    const client = this.raveBase.encrypt(JSON.stringify(obj));

    return {
      PBFPubKey,
      client,
      alg,
    };
  }

  async preauth(data: RaveCardPaymentOptions) {
    const value = CardPayment(data);
    const payload = this.preparePreauth(value);

    return this.raveBase.post(this.preauthEndpoint, payload);
  }

  private validateRef(options: RaveFlutterRef) {
    const schema: JoiSchema<RaveFlutterRef> = {
      flwRef: joi
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
  async capture(options: RaveFlutterRef) {
    const value = this.validateRef(options);

    const payload = {
      ...value,
      SECKEY: this.raveBase.secretKey,
    };

    return this.raveBase.post(this.preauthCaptureEndpoint, payload);
  }

  async refund(options: RaveFlutterRef) {
    const value = this.validateRef(options);

    const payload = {
      ...value,
      action: 'refund',
      SECKEY: this.raveBase.secretKey,
    };

    return this.raveBase.post(this.preauthRefundVoidEndpoint, payload);
  }

  async voidPreauth(options: RaveFlutterRef) {
    const value = this.validateRef(options);

    const payload = {
      ...value,
      action: 'void',
      SECKEY: this.raveBase.secretKey,
    };

    return this.raveBase.post(this.preauthRefundVoidEndpoint, payload);
  }
}

export default RaveCardPreauth;
