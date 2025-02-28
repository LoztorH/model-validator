/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import ValidationHelper from '../../validation/ValidationHelper';
import { validate } from '../object/_newDecorator';

function positive(mode: 'strong' | 'weak' = 'weak', isFloat?: boolean) {
  const data = { type: 'positive', mode, isFloat };
  return validate<any>((value, name, data) => {
    if (value.field != undefined && value.field != null && value.field !== '') {
      ValidationHelper.isNum(value.field, name, data);
    }
  }, data);
}

function negative(mode: 'strong' | 'weak' = 'weak', isFloat?: boolean) {
  const data = { type: 'negative', mode, isFloat };
  return validate<any>((value, name, data) => {
    if (value.field != undefined && value.field != null && value.field !== '') {
      ValidationHelper.isNum(value.field, name, data);
    }
  }, data);
}

function notZero(mode: 'strong' | 'weak' = 'weak') {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null && value.field !== '') {
      ValidationHelper.isNum(value.field, name, { mode });
      if (value.field == 0) {
        throw new Error();
      }
    }
  });
}

function min(min: number, mode: 'strong' | 'weak' = 'weak') {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null && value.field !== '') {
      ValidationHelper.isNum(value.field, name, { mode });
      if (value.field < min) {
        throw new Error();
      }
    }
  });
}

function max(max: number, mode: 'strong' | 'weak' = 'weak') {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null && value.field !== '') {
      ValidationHelper.isNum(value.field, name, { mode });
      if (value.field > max) {
        throw new Error();
      }
    }
  });
}

function type(mode: 'strong' | 'weak' = 'weak') {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null && value.field !== '') {
      ValidationHelper.isNum(value.field, name, { mode });
    }
  });
}

function int() {
  return validate<any>((value, name) => {
    if (value.field != undefined && value.field != null && value.field !== '') {
      ValidationHelper.isInt(value.field, name);
    }
  });
}

export default { type, negative, positive, notZero, min, max, int };
