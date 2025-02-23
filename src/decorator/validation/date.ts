/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import ValidationHelper from '../../validation/ValidationHelper';
import { valDecorator } from '../object/_newDecorator';

export function type(
  format:
    | 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    | 'YYYYMM'
    | 'YYYY-MM'
    | 'YYYY-MM-DD'
    | 'YYYY-DD'
    | 'YYYY-MM-DD HH:mm:ss'
    | 'YYYY-MM-DDTHH:mm:ssZSSSS' = 'YYYY-MM-DD'
) {
  return valDecorator<typeof format>((value, name, format) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null && value.field != '') {
      val.dateOnly(value.field, name, format);
    }
  }, format);
}

export function range(
  toDateFieldName: string,
  maxDiff: number,
  mode: 'months' | 'years' | 'days'
) {
  return valDecorator((value, name) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null && value.field != '') {
      if (
        value.object[toDateFieldName] != undefined &&
        value.object[toDateFieldName] != null &&
        value.object[toDateFieldName] != ''
      ) {
        val.maxDate(value.field, value.object[toDateFieldName], maxDiff, mode, value.field, toDateFieldName);
      }
    }
  });
}

export default { type, range };
