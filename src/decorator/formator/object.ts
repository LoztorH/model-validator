/* eslint-disable @typescript-eslint/no-explicit-any */

import { fmtDecorator, intiObject } from '../object/_newDecorator';

export function format(objectType: any) {
  return fmtDecorator<any>((value) => {
    if (value != undefined && value != null) {
      intiObject(value, objectType);
    }
  });
}
