import joi from 'joi';

import { RaveCardPaymentOptions, basePaymentSchema } from './commonTypes';
import { JoiSchema } from '../types';
import { SCHEMA_OPTIONS } from '../constants';

function cardPayment(data: RaveCardPaymentOptions) {
  const schema: JoiSchema<RaveCardPaymentOptions> = {
    cardno: joi
      .string()
      .required()
      .min(10),
    cvv: joi
      .string()
      .required()
      .min(3),
    expirymonth: joi
      .number()
      .required()
      .max(12)
      .min(1)
      .raw(),
    expiryyear: joi
      .number()
      .required()
      .greater(17),
    pin: joi.number().greater(99),
    suggested_auth: joi.string().uppercase(),
    redirect_url: joi.string().uri(),
    charge_type: joi.string(),
    ...basePaymentSchema,
  };

  const { error, value } = joi.validate(data, schema, SCHEMA_OPTIONS);

  if (error) {
    throw error;
  }

  return value;
}

export default cardPayment;
