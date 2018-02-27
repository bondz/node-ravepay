import joi from 'joi';

import { RaveMpesaPaymentOptions, basePaymentSchema } from './commonTypes';
import { JoiSchema } from '../types';
import { SCHEMA_OPTIONS } from '../constants';

function mpesaPayment(data: RaveMpesaPaymentOptions) {
  const schema: JoiSchema<RaveMpesaPaymentOptions> = {
    orderRef: joi.string().required(),
    ...basePaymentSchema,
  };

  const { error, value } = joi.validate(data, schema, SCHEMA_OPTIONS);

  if (error) {
    throw error;
  }

  return {
    ...value,
    is_mpesa: 1,
    'payment-type': 1,
  };
}

export default mpesaPayment;
