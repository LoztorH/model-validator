/* eslint-disable @typescript-eslint/no-explicit-any */

import { intiObject, validate } from '../object/_newDecorator';

export function type(objectType: any) {
  return validate<any>((value) => {
    if (value.field != undefined && value.field != null) {
      intiObject(value.field, objectType);
    }
  });
}

export default { type };
