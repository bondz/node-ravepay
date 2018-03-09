# Ravepay Nodejs Library

## Ravepay Services exposed by the library

* [Payments](https://flutterwavedevelopers.readme.io/v2.0/reference#rave-parameters)
  * Account
  * Card
  * USSD
  * Ghana Mobile
  * Mpesa
* [Validation](https://flutterwavedevelopers.readme.io/v2.0/reference#rave-validation)
  * Account
  * Card
* Transactions
  * [Verification](https://flutterwavedevelopers.readme.io/v2.0/reference#transaction-status-check)
  * [XRequery](https://flutterwavedevelopers.readme.io/v2.0/reference#xrequery-transaction-verification)
  * [Refund](https://flutterwavedevelopers.readme.io/v2.0/reference#refund)
  * [Stop Recurring Payment](https://flutterwavedevelopers.readme.io/v2.0/reference#stop-recurring-payment)
  * [List Recurring Transactions](https://flutterwavedevelopers.readme.io/v2.0/reference#list-all-recurring-transactions)
* [Preauth](https://flutterwavedevelopers.readme.io/v2.0/reference#introduction-1)
  * Preauth
  * Capture
  * Refund
  * Void
* Misc
  * [Get Fees](https://flutterwavedevelopers.readme.io/v2.0/reference#get-fees)
  * [List of Banks](https://flutterwavedevelopers.readme.io/v2.0/reference#list-of-banks)
  * [Exchange Rate](https://flutterwavedevelopers.readme.io/v2.0/reference#ratesforexinput)
* Security
  * Encryption
  * Intergrity Hash

## Todo

* Disbursement
* Tokenize
* Type Responses

For more information on the services listed above, visit the [Ravepay website](https://ravepay.co)

## Usage

`yarn add node-ravepay`

or

`npm install --save node-ravepay`

This library supports RavePay staging and Production requests, you'll need to get a `PUBLIC_KEY` and `SECRET_KEY` from the RavePay dashboard.

See [here](https://flutterwavedevelopers.readme.io/docs/setting-up-on-rave) on how to obtain your keys.

Using CJS

```js
const Ravepay = require('node-ravepay');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY);
```

Using Typescript or ESM

```ts
import Ravepay from 'node-ravepay';

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY);
```

The `RavePay` class takes an optional third argument

```ts
interface RaveOptions {
  /**
   * Sets the Rave API URL to the sandox url
   *
   */
  sandbox: boolean;

  /**
   * Generates an integrity hash for payment request to the flutterwave API
   *
   */
  generateIntegrityHash: boolean;
  /**
   * Specify your own custom endpoint where requests should be sent
   *
   */
  endpoint: string;
}
```

To send requests to the Rave Staging endpoint at `http://flw-pms-dev.eu-west-1.elasticbeanstalk.com`, you would write

```ts
const raveOptions = { sandbox: true };
const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, raveOptions);
```

The library also has typings if you're using [Typescript](https://typescriptlang.org)

_All methods returns promises_

## Payments

```
rave.Payments.cardPayment
rave.Payments.bankPayment
rave.Payments.ussdPayment
rave.Payments.ghanaMobilePayment
rave.Payments.recurringPayment
rave.Payments.mpesaPayment
```

## Validation

```
rave.Validation.cardValidation
rave.Validation.bankValidation
```

## Transactions

```
rave.Transactions.verify
rave.Transactions.query
rave.Transactions.refund
rave.Transactions.stopRecurringPayment
rave.Transactions.listAllRecurringTransactions
rave.Transactions.listSingleRecurringTransaction
```

## Security

```
rave.Security.encrypt
rave.Security.generateIntegrityHash
```
