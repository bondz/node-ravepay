import joi from 'joi';

import {
  RaveGhanaMobilePaymentOptions,
  basePaymentSchema,
} from './commonTypes';
import { JoiSchema } from '../types';
import { SCHEMA_OPTIONS } from '../constants';

function ghanaMobile(data: RaveGhanaMobilePaymentOptions) {
  const schema: JoiSchema<RaveGhanaMobilePaymentOptions> = {
    network: joi.string().required(),
    orderRef: joi.string().required(),
    ...basePaymentSchema,
  };

  const { error, value } = joi.validate(data, schema, SCHEMA_OPTIONS);

  if (error) {
    throw error;
  }

  return {
    ...value,
    'payment-type': 'mobilemoneygh',
    is_mobile_money_gh: 1,
  };
}

export default ghanaMobile;
