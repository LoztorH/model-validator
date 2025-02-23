/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import ValidationHelper from '../../validation/ValidationHelper';
import { intiObject, valDecorator } from '../object/_newDecorator';

function allStr() {
  return valDecorator<any>((value, name) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
      for (const obj of value.field) {
        val.isString(obj, name);
      }
    }
  });
}

function allStrLen(min: number, max: number) {
  const data = {
    min,
    max,
  };
  return valDecorator<any>((value, name, data) => {
    const val = new ValidationHelper();

    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
      for (const str of value.field) {
        val.isString(str, name, data);
      }
    }
  }, data);
}

function length(length: number) {
  return valDecorator<any>((value, name) => {
    const val = new ValidationHelper();

    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
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
  return valDecorator<any>((value, name) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
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
  return valDecorator<any>((value, name) => {
    let strLength = 0;

    const val = new ValidationHelper();

    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
      for (const str of value.field) {
        val.isString(str, name, data);
        strLength += str.length;
      }
    }
    if (strLength > maxChar) {
      throw new Error();
    }
  }, data);
}

function allObj(objectType: any) {
  return valDecorator<any>((value, name) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
      for (const obj of value.field) {
        intiObject(obj, objectType);
      }
    }
  });
}

function allEnums(enumModel: any) {
  return valDecorator<any>((value, name) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
      for (const obj of value.field) {
        val.isEnum(obj, name, enumModel, { type: 'weak' });
      }
    }
  });
}

function allNums(mode: 'weak' | 'strong' = 'weak') {
  return valDecorator<any>((value, name) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
      for (const obj of value.field) {
        val.isNum(obj, name, { mode });
      }
    }
  });
}

function allPositive(mode: 'weak' | 'strong' = 'weak') {
  return valDecorator<any>((value, name) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
      for (const obj of value.field) {
        val.isNum(obj, name, { mode, type: 'positive' });
      }
    }
  });
}

function allNegative(mode: 'weak' | 'strong' = 'weak') {
  return valDecorator<any>((value, name) => {
    const val = new ValidationHelper();
    if (value.field != undefined && value.field != null) {
      val.isArray(value.field, name);
      for (const obj of value.field) {
        val.isNum(obj, name, { mode, type: 'negative' });
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
