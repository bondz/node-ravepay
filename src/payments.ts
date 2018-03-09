import RaveBase from './rave';
import {
  RaveCardPaymentOptions,
  RaveBankPaymentOptions,
  RaveUSSDPaymentOptions,
  RaveGhanaMobilePaymentOptions,
  RaveRecurringPaymentOptions,
  RaveMpesaPaymentOptions,
  CardPayment,
  BankPayment,
  USSDPayment,
  GhanaMobilePayment,
  RecurringPayment,
  MpesaPayment,
} from './paymentMethods';
import { DIRECT_CHARGE_URL, ENCRYPTION_ALGO } from './constants';
import { generateIntegrityHash } from './helpers/security';

class RavePayments {
  private raveBase: RaveBase;
  private endpoint: string;
  constructor(raveBase: RaveBase) {
    this.raveBase = raveBase;
    this.endpoint = this.raveBase.buildEndpoint(DIRECT_CHARGE_URL);
  }

  private prepare(data: any) {
    const alg = ENCRYPTION_ALGO;
    const PBFPubKey = this.raveBase.publicKey;
    const obj = {
      ...data,
      PBFPubKey,
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

  async cardPayment(data: RaveCardPaymentOptions) {
    const value = CardPayment(data);
    const payload = this.prepare(value);

    return this.raveBase.post(this.endpoint, payload);
  }

  async bankPayment(data: RaveBankPaymentOptions) {
    const value = BankPayment(data);
    const payload = this.prepare(value);

    return this.raveBase.post(this.endpoint, payload);
  }

  async ussdPayment(data: RaveUSSDPaymentOptions) {
    const value = USSDPayment(data);
    const payload = this.prepare(value);

    return this.raveBase.post(this.endpoint, payload);
  }

  async ghanaMobilePayment(data: RaveGhanaMobilePaymentOptions) {
    const value = GhanaMobilePayment(data);
    const payload = this.prepare(value);

    return this.raveBase.post(this.endpoint, payload);
  }

  async recurringPayment(data: RaveRecurringPaymentOptions) {
    const value = RecurringPayment(data);
    const payload = this.prepare(value);

    return this.raveBase.post(this.endpoint, payload);
  }

  async mpesaPayment(data: RaveMpesaPaymentOptions) {
    const value = MpesaPayment(data);
    const payload = this.prepare(value);

    return this.raveBase.post(this.endpoint, payload);
  }
}

export default RavePayments;
