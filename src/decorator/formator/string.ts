/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { escapeRegExp, replaceAll } from '../../string/StringHelper';
import { format } from '../object/_newDecorator';

function trim() {
  return format<string>((value, data) => {
    if (value.field) {
      const str = value.field.trim();
      return str;
    } else {
      return value.field;
    }
  });
}

function urlDecode() {
  return format<string>((value, data) => {
    if (value.field) {
      const str = decodeURI(value.field);
      return str;
    } else {
      return value.field;
    }
  });
}

function urlEncode() {
  return format<string>((value, data) => {
    if (value.field) {
      const str = encodeURI(value.field);
      return str;
    } else {
      return value.field;
    }
  });
}

function toLowerCase() {
  return format<string>((value, data) => {
    if (value.field) {
      const str = value.field.toLowerCase();
      return str;
    } else {
      return value.field;
    }
  });
}
function toUpperCase() {
  return format<string>((value, data) => {
    if (value.field) {
      const str = value.field.toUpperCase();
      return str;
    } else {
      return value.field;
    }
  });
}

function replace(find, replace) {
  return format<string>((value, data) => {
    if (value.field) {
      const str = replaceAll(value.field, escapeRegExp(find), replace);
      return str;
    } else {
      return value.field;
    }
  });
}

export default {
  trim,
  urlEncode,
  urlDecode,
  toLowerCase,
  toUpperCase,
  replace,
};
