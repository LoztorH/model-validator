/* eslint-disable @typescript-eslint/no-explicit-any */

import { intiObject, valDecorator } from '../object/_newDecorator';

export function type(objectType: any) {
  return valDecorator<any>((value) => {
    if (value.field != undefined && value.field != null) {
      intiObject(value.field, objectType);
    }
  });
}

export default { type };
