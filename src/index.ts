import RavePayments from './payments';
import RaveBase from './rave';
import { RaveOptions } from './types';
import RaveCardPreauth from './preauth/card';
import RaveTransactions from './transactions';
import RaveMiscellaneous from './misc';
import RaveValidation from './validation';

const raveDefaults: RaveOptions = {
  sandbox: false,
  generateIntegrityHash: false,
  endpoint: '',
};

class RavePay {
  Validation: RaveValidation;
  Misc: RaveMiscellaneous;
  Transactions: RaveTransactions;
  Preauth: { card: RaveCardPreauth };
  private rave: RaveBase;
  public Payments: RavePayments;

  constructor(
    publicKey: string,
    secretKey: string,
    options?: Partial<RaveOptions>,
  ) {
    if (!publicKey || !secretKey) {
      throw new Error('Public key and Secret key must be specified.');
    }

    const raveOptions: RaveOptions = {
      ...raveDefaults,
      ...options,
    };

    this.rave = new RaveBase(publicKey, secretKey, raveOptions);
    this.Payments = new RavePayments(this.rave);
    this.Preauth = {
      card: new RaveCardPreauth(this.rave),
    };
    this.Transactions = new RaveTransactions(this.rave);
    this.Misc = new RaveMiscellaneous(this.rave);
    this.Validation = new RaveValidation(this.rave);
  }
}

export default RavePay;
