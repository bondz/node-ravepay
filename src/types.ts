import { AnySchema } from 'joi';

export interface RaveOptions {
  /**
   * Sets the Rave API URL to the sandox url
   *
   * @type {boolean}
   * @memberof RaveOptions
   */
  sandbox: boolean;

  /**
   * Generates an integrity hash for every request to the flutterwave API
   *
   * @type {boolean}
   * @memberof RaveOptions
   */
  generateIntegrityHash: boolean;
  /**
   * Specify your own custom endpoint where requests should be sent
   *
   * @type {string}
   * @memberof RaveOptions
   */
  endpoint: string;
}

export type JoiSchema<T> = { [P in NonNullable<keyof T>]: AnySchema };
