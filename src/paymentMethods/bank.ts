import joi from 'joi';

import { RaveBankPaymentOptions, basePaymentSchema } from './commonTypes';
import { JoiSchema } from '../types';
import { SCHEMA_OPTIONS } from '../constants';

function bankPayment(data: RaveBankPaymentOptions) {
  const schema: JoiSchema<RaveBankPaymentOptions> = {
    accountnumber: joi
      .string()
      .min(5)
      .required(),
    accountbank: joi.string().required(),
    payment_type: joi
      .string()
      .default('account')
      .only('account'),
    passcode: joi.string().length(8),
    ...basePaymentSchema,
  };

  const { error, value } = joi.validate(data, schema, SCHEMA_OPTIONS);

  if (error) {
    throw error;
  }

  return {
    ...value,
    payment_type: 'account',
  };
}

export default bankPayment;
