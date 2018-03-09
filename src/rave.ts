import { post, get } from 'request';

import { RaveOptions } from './types';
import { API_LIVE_URL, API_SANDBOX_URL } from './constants';
import { encrypt } from './helpers/security';

class RaveBase {
  readonly publicKey: string;
  readonly secretKey: string;
  private raveEndPoint: string;
  readonly generateIntegrity: boolean;

  constructor(publicKey: string, secretKey: string, options: RaveOptions) {
    this.publicKey = publicKey;
    this.secretKey = secretKey;
    this.generateIntegrity = options.generateIntegrityHash;
    this.raveEndPoint = options.endpoint
      ? options.endpoint
      : options.sandbox ? API_SANDBOX_URL : API_LIVE_URL;
  }

  buildEndpoint(path: string) {
    return `${this.raveEndPoint}${path}`;
  }

  encrypt(payload: string) {
    return encrypt(this.secretKey, payload);
  }

  post(URI: string, payload: any) {
    return new Promise((resolve, reject) => {
      post(
        URI,
        {
          json: true,
          body: payload,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
        (error, response, body) => {
          if (error) {
            reject(error);
          }

          if (response.statusCode >= 400) {
            reject(body);
          }

          if (body && body.status === 'error') {
            reject(body);
          }

          resolve(body);
        },
      );
    });
  }

  get(URI: string, payload: any) {
    return new Promise((resolve, reject) => {
      get(
        URI,
        {
          json: true,
          qs: payload,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
        (error, response, body) => {
          if (error) {
            reject(error);
          }

          if (response.statusCode >= 400) {
            reject(body);
          }

          if (body && body.status === 'error') {
            reject(body);
          }

          resolve(body);
        },
      );
    });
  }
}

export default RaveBase;
