/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import ValidationHelper from '../../validation/ValidationHelper';
import { intiObject, validate } from '../object/_newDecorator';

function allStr() {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      for (const obj of value.field) {
        ValidationHelper.isString(obj, name);
      }
    }
  });
}

function allStrLen(min: number, max: number) {
  const data = {
    min,
    max,
  };
  return validate<any>((value, name, data) => {
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      for (const str of value.field) {
        ValidationHelper.isString(str, name, data);
      }
    }
  }, data);
}

function length(length: number) {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      if (value.field.length != length) {
        throw new Error();
      }
    }
  });
}

function lengthInRange(min: number, max: number) {
  const data = {
    min,
    max,
  };
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      if (value.field.length < min || value.field.length > max) {
        throw new Error();
      }
    }
  }, data);
}

function withinCharMax(min: number, max: number, maxChar: number) {
  const data = {
    min,
    max,
  };
  return validate<any>((value, name) => {
    let strLength = 0;
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      for (const str of value.field) {
        ValidationHelper.isString(str, name, data);
        strLength += str.length;
      }
    }
    if (strLength > maxChar) {
      throw new Error();
    }
  }, data);
}

function allObj(objectType: any) {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      for (const obj of value.field) {
        intiObject(obj, objectType);
      }
    }
  });
}

function allEnums(enumModel: any) {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      for (const obj of value.field) {
        ValidationHelper.isEnum(obj, name, enumModel, { type: 'weak' });
      }
    }
  });
}

function allNums(mode: 'weak' | 'strong' = 'weak') {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      for (const obj of value.field) {
        ValidationHelper.isNum(obj, name, { mode });
      }
    }
  });
}

function allPositive(mode: 'weak' | 'strong' = 'weak') {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      for (const obj of value.field) {
        ValidationHelper.isNum(obj, name, { mode, type: 'positive' });
      }
    }
  });
}

function allNegative(mode: 'weak' | 'strong' = 'weak') {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null) {
      ValidationHelper.isArray(value.field, name);
      for (const obj of value.field) {
        ValidationHelper.isNum(obj, name, { mode, type: 'negative' });
      }
    }
  });
}

export default {
  allObj,
  allEnums,
  allNums,
  allStr,
  allStrLen,
  withinCharMax,
  length,
  lengthInRange,
  allPositive,
  allNegative,
};
