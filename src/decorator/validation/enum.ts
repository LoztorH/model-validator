/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import ValidationHelper from '../../validation/ValidationHelper';
import { validate } from '../object/_newDecorator';

export function type(enumModel: any) {
  return validate<any>((value, name, data) => {
    if (value.field != undefined && value.field != null && value.field != '') {
      ValidationHelper.isEnum(value.field, name, data, { type: 'weak' });
    }
  }, enumModel);
}

export default { type };
