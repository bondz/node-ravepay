export const SCHEMA_OPTIONS = {
  abortEarly: false,
  allowUnknown: true,
  skipFunctions: true,
};

export const API_SANDBOX_URL =
  'http://flw-pms-dev.eu-west-1.elasticbeanstalk.com';
export const API_LIVE_URL = 'https://api.ravepay.co';
export const ENCRYPTION_ALGO = '3DES-24';
export const DIRECT_CHARGE_URL = '/flwv3-pug/getpaidx/api/charge';
export const PREAUTH_CAPTURE_URL = '/flwv3-pug/getpaidx/api/capture';
export const PREAUTH_REFUNDORVOID_URL = '/flwv3-pug/getpaidx/api/refundorvoid';
export const TRANSACTION_VERIFY_URL = '/flwv3-pug/getpaidx/api/verify';
export const TRANSACTION_XREQUERY_URL = '/flwv3-pug/getpaidx/api/xrequery';
export const TRANSACTION_REFUND_URL = '/gpx/merchant/transactions/refund';
export const TRANSACTION_ALL_RECURRING_URL = '/merchant/subscriptions/list';
export const TRANSACTION_STOP_RECURRING_URL = '/merchant/subscriptions/stop';
export const VALIDATION_CARD_URL = '/flwv3-pug/getpaidx/api/validatecharge';
export const VALIDATION_BANK_URL = '/flwv3-pug/getpaidx/api/validate';
export const MISC_GET_FEES_URL = '/flwv3-pug/getpaidx/api/fee';
export const MISC_LIST_BANKS_URL = '/flwv3-pug/getpaidx/api/flwpbf-banks.js';
export const MISC_EXCHANGE_RATE_URL = '/flwv3-pug/getpaidx/api/forex';
