import joi from 'joi';

import { RaveRecurringPaymentOptions, basePaymentSchema } from './commonTypes';
import { JoiSchema } from '../types';
import { SCHEMA_OPTIONS } from '../constants';

function recurringPayment(data: RaveRecurringPaymentOptions) {
  const schema: JoiSchema<RaveRecurringPaymentOptions> = {
    cardno: joi
      .string()
      .required()
      .min(10),
    cvv: joi
      .string()
      .required()
      .min(3),
    expirymonth: joi.number().required(),
    expiryyear: joi
      .number()
      .required()
      .greater(18),
    pin: joi.number().greater(99),
    suggested_auth: joi.string().uppercase(),
    charge_type: joi
      .string()
      .only(
        'recurring-daily',
        'recurring-weekly',
        'recurring-monthly',
        'recurring-quarterly',
        'recurring-bianually',
        'recurring-anually',
      ),
    recurring_stop: joi.string().regex(/\d{4}-\d{2}-\d{2}/),
    ...basePaymentSchema,
  };

  const { error, value } = joi.validate(data, schema, SCHEMA_OPTIONS);

  if (error) {
    throw error;
  }

  return value;
}

export default recurringPayment;
