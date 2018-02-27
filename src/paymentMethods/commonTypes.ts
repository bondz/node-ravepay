import joi from 'joi';
import { JoiSchema } from '../types';

export interface RaveDirectChargeOptions {
  /**
   * This is the specified currency to charge the card in.
   *
   * @type {string}
   * @default NGN Defaults to Naira
   * @memberof RaveDirectChargeOptions
   */
  currency?: string;
  /**
   * This is the pair country for the transaction with respect to the currency.
   *
   * See a list of Multicurrency support @see https://flutterwavedevelopers.readme.io/docs/multicurrency-payments
   *
   * @type {string}
   * @memberof RaveDirectChargeOptions
   */
  country?: string;
  /**
   * This is the amount to be charged from card
   *
   * @type {number}
   * @memberof RaveDirectChargeOptions
   */
  amount: number;
  /**
   * This is the email address of the customer.
   *
   * @type {string}
   * @memberof RaveDirectChargeOptions
   */
  email: string;
  /**
   * This is the phone number of the customer.
   *
   * @type {string}
   * @memberof RaveDirectChargeOptions
   */
  phonenumber: string;
  /**
   * This is the first name of the card holder or the customer.
   *
   * @type {string}
   * @memberof RaveDirectChargeOptions
   */
  firstname: string;
  /**
   * This is the last name of the card holder or the customer.
   *
   * @type {string}
   * @memberof RaveDirectChargeOptions
   */
  lastname: string;
  /**
   * The current IP address of the customer carrying out the transaction.
   *
   * @type {string}
   * @memberof RaveDirectChargeOptions
   */
  IP: string;
  /**
   * The unique reference generated for this transaction.
   *
   * @type {string}
   * @memberof RaveDirectChargeOptions
   */
  txRef: string;
  /**
   * This is the fingerprint for the device being used.
   *
   * @type {string}
   * @memberof RaveDirectChargeOptions
   */
  device_fingerprint?: string;
}

export interface RaveCardPaymentOptions extends RaveDirectChargeOptions {
  /**
   * This is the number on the cardholders card.
   *
   * @type {string}
   * @memberof RaveCardPaymentOptions
   */
  cardno: string;
  /**
   * This is the 3-digit number at the back of the card.
   *
   * @type {string}
   * @memberof RaveCardPaymentOptions
   */
  cvv: string;
  /**
   * This is the month of card expiration as written on a cardholder’s card.
   * Format is MM.
   *
   * @type {(string | number)}
   * @memberof RaveCardPaymentOptions
   */
  expirymonth: string | number;
  /**
   * This is the year of card expiration as written on a cardholder’s card.
   * Format is YY.
   *
   * @type {(string | number)}
   * @memberof RaveCardPaymentOptions
   */
  expiryyear: string | number;

  /**
   * This is the pin issued to the customer for his card.
   *
   * Used only for transactions that require PIN
   *
   * @type {(string|number)}
   * @memberof RaveCardPaymentOptions
   */
  pin?: string | number;
  /**
   * This is an identifier to show that the suggested authentication model is being used.
   *
   *
   * @type {string}
   * @default PIN
   * @memberof RaveCardPaymentOptions
   */
  suggested_auth?: string;
  /**
   * The URL to redirect to after the user completed payment.
   *
   * Used when a VISA card is charged
   * The webhook is called with the query parameters.
   *
   * @type {string}
   * @memberof RaveCardPaymentOptions
   */
  redirect_url?: string;
  /**
   * This identifies that you are making a preauthorised payment request call to the charge endpoint by passing the value preauth.
   *
   * It should be built with your payment request only when carrying out a preauthorised transaction.
   *
   * @type {string}
   * @memberof RaveCardPaymentOptions
   */
  charge_type?: string;
}

export interface RaveBankPaymentOptions extends RaveDirectChargeOptions {
  /**
   * This is the account number of the customer associated with a valid bank account.
   *
   * @type {string}
   * @memberof RaveBankPaymentOptions
   */
  accountnumber: string;
  /**
   * This represents the bank account to be debited
   *
   * To see a list of supported banks @see https://flutterwavedevelopers.readme.io/v1.0/reference#list-of-banks
   *
   * @type {string}
   * @memberof RaveBankPaymentOptions
   */
  accountbank: string;
  /**
   * This specifies that the payment method being used is for account payments
   *
   * @type {string}
   * @default account
   * @memberof RaveBankPaymentOptions
   */
  payment_type?: string;
  /**
   * This requires that the customer date of birth is collected.
   *
   * Only used for Zenith bank account payment. Should be in the format DDMMYYYY
   *
   * @type {string}
   * @memberof RaveBankPaymentOptions
   */
  passcode?: string;
}

export interface RaveGhanaMobilePaymentOptions extends RaveDirectChargeOptions {
  network: string;
  orderRef: string;
}

export interface RaveMpesaPaymentOptions extends RaveDirectChargeOptions {
  orderRef: string;
}

export type ExcludedRecurringType = {
  redirect_url?: string;
};

export type ExcludedUSSDType = {
  passcode?: string;
};

export type RaveRecurringPaymentCommon = {
  [T in Exclude<
    keyof RaveCardPaymentOptions,
    keyof ExcludedRecurringType
  >]: RaveCardPaymentOptions[T]
};

export type RaveUSSDPaymentCommon = {
  [T in Exclude<
    keyof RaveBankPaymentOptions,
    keyof ExcludedUSSDType
  >]: RaveBankPaymentOptions[T]
};

export interface RaveRecurringPaymentOptions
  extends RaveRecurringPaymentCommon {
  recurring_stop?: string;
  charge_type:
    | 'recurring-daily'
    | 'recurring-weekly'
    | 'recurring-monthly'
    | 'recurring-quarterly'
    | 'recurring-bianually'
    | 'recurring-anually';
}

export interface RaveUSSDPaymentOptions extends RaveUSSDPaymentCommon {
  orderRef: string;
}

export const basePaymentSchema: JoiSchema<RaveDirectChargeOptions> = {
  currency: joi
    .string()
    .uppercase()
    .min(2)
    .default('NGN'),
  country: joi
    .string()
    .uppercase()
    .min(2)
    .default('NG'),
  amount: joi
    .number()
    .required()
    .greater(0),
  email: joi
    .string()
    .email()
    .required(),
  phonenumber: joi.string().required(),
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  IP: joi
    .string()
    .ip()
    .required(),
  txRef: joi.string().required(),
  device_fingerprint: joi.string(),
};
