/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import ValidationHelper from '../../validation/ValidationHelper';
import { validate } from '../object/_newDecorator';

export function required() {
  return validate<any>((value, name) => {
    const val = new ValidationHelper();
    val.isNullOrEmpty(value.field, name);
  });
}
