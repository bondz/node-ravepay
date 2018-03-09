import RaveBase from './rave';
import { encrypt, generateIntegrityHash } from './helpers/security';

class RaveSecurity {
  private raveBase: RaveBase;
  constructor(raveBase: RaveBase) {
    this.raveBase = raveBase;
  }

  async encrypt(data: string | any) {
    let payload = data;
    if (typeof payload !== 'string') {
      payload = JSON.stringify(payload);
    }

    return encrypt(this.raveBase.secretKey, payload);
  }

  async generateIntegrityHash(payload: any) {
    return generateIntegrityHash(this.raveBase.secretKey, payload);
  }
}

export default RaveSecurity;
