/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import ValidationHelper from "../../validation/ValidationHelper";
import { intiObject } from "../object/_newDecorator";

export function vaildateParam(
  argument: number,
  objectPath: string,
  objectType: any
) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value!;
    descriptor.value = function () {
      let data = arguments[argument];
      if (objectPath) {
        const objectPathArr = objectPath.split(".");
        for (const objectName in objectPathArr) {
          data = data[objectPathArr[objectName]];
        }
      }
      intiObject(data, objectType);
      return method.apply(this, arguments);
    };
  };
}
