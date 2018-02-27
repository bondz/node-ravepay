import joi from 'joi';

import { RaveUSSDPaymentOptions, basePaymentSchema } from './commonTypes';
import { JoiSchema } from '../types';
import { SCHEMA_OPTIONS } from '../constants';

function ussdPayment(data: RaveUSSDPaymentOptions) {
  const schema: JoiSchema<RaveUSSDPaymentOptions> = {
    accountnumber: joi
      .string()
      .min(5)
      .required(),
    accountbank: joi.string().required(),
    payment_type: joi.string().default('ussd'),
    orderRef: joi.string().required(),
    ...basePaymentSchema,
  };

  const { error, value } = joi.validate(data, schema, SCHEMA_OPTIONS);

  if (error) {
    throw error;
  }

  return {
    ...value,
    is_ussd: 1,
    payment_type: 'ussd',
  };
}

export default ussdPayment;
