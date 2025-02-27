/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import ValidationHelper from '../../validation/ValidationHelper';
import { validate } from '../object/_newDecorator';

export function type() {
  return validate<any>((value, name) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null && value.field != '') {
      val.isBoolean(value.field, name);
    }
  });
}

export default { type };
