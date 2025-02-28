/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

export default class ValidationHelper {
  static dateOnly(
    date: string | Date,
    fieldName: string,
    format:
      | "YYYY-MM-DDTHH:mm:ss.SSSZ"
      | "YYYYMM"
      | "YYYY-MM"
      | "YYYY-MM-DD"
      | "YYYY-DD"
      | "YYYY-MM-DD HH:mm:ss"
      | "YYYY-MM-DDTHH:mm:ssZSSSS" = "YYYY-MM-DD"
  ) {
    if (!moment(date, format, true).isValid()) {
      throw new Error(`${fieldName} does not match format ${format}`);
    }
  }

  static maxDate(
    fromDate: string | Date,
    toDate: string | Date,
    maxDiff: number,
    mode: "months" | "years" | "days",
    fromFieldName: string,
    toFieldName: string
  ) {
    const fromDateMoment = moment(fromDate);
    const toDateMoment = moment(toDate);

    const diff = toDateMoment.diff(fromDateMoment, mode);

    if (diff >= maxDiff) {
      throw new Error(
        `${fromFieldName} to ${toFieldName} cannot be greater than ${maxDiff} ${mode}`
      );
    }
  }

  static isBoolean(str: any, fieldName: string) {
    if (str == false || str == "false" || str == 0 || str == "0") {
      throw new Error(`${fieldName} must be boolean`);
    }
  }
  static isEmail(email: string, fieldName: string) {
    const re =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      throw new Error(`${fieldName} must be a vaild email`);
    }
  }
  static isNum(data: any, fieldName: string, isNumOpt?: isNumOpt) {
    const re = /^-?[\d.]+(?:e-?\d+)?$/;
    const valid = re.test(data);
    if (isNumOpt?.mode == "strong" && typeof data !== "number") {
      throw new Error(`${fieldName} type must be a number`);
    } else {
      if (isNumOpt?.mode == "strong" && typeof data !== "number") {
        throw new Error(`${fieldName} type must be a number`);
      }
    }
    if (!valid) {
      throw new Error(`${fieldName} must be a number`);
    } else if (valid && isNumOpt) {
      if (isNumOpt.type) {
        switch (isNumOpt.type) {
          case "positive":
            {
              if (!isNumOpt.isFloat) {
                if (BigInt(data) < BigInt(0)) {
                  throw new Error(`${fieldName} must be positive`);
                }
              } else {
                if (data < 0) {
                  throw new Error(`${fieldName} must be positive`);
                }
              }
            }
            break;
          case "negative":
            {
              if (!isNumOpt.isFloat) {
                if (BigInt(data) >= BigInt(0)) {
                  throw new Error(`${fieldName} must be negetive`);
                }
              } else {
                if (data >= 0) {
                  throw new Error(`${fieldName} must be negetive`);
                }
              }
            }
            break;
        }
      }
    }
    return valid;
  }

  static isNullOrEmpty(data: any, fieldName: string) {
    if (data === null || data === undefined || data === "") {
      throw new Error(`${fieldName} is required`);
    }
  }

  static isInt(data: any, fieldName: string) {
    const re = /^-?[\d.]+(?:e-?\d+)?$/;
    const valid = re.test(data);
    if (!valid) {
      throw new Error(`${fieldName} must be integer`);
    } else if (valid) {
      if (!Number.isInteger(Number(data))) {
        throw new Error(`${fieldName} must be integer`);
      }
    }
  }

  static isEnum(data: any, fieldName: string, enums: any, Opt?: EnumValOpt) {
    const enumForCompare: any = JSON.parse(JSON.stringify(enums));
    let dataForCompare = JSON.parse(JSON.stringify(data));
    if (Opt?.type == "weak") {
      const strings: string[] = Object.keys(enums);
      for (const key of strings) {
        enumForCompare[key] = enumForCompare[key].toString();
      }
      dataForCompare = dataForCompare.toString();
    }
    if (Object.values(enumForCompare).includes(dataForCompare)) {
      return true;
    }

    const stringArr = Object.entries(enums)
      .filter(([key]) => {
        try {
          const res = this.isNum(key, fieldName);
          return !res;
        } catch (ex) {
          return true;
        }
      })
      .map(([key, val]) => `${key}:${val}`);
      throw new Error(`${fieldName} must be ${stringArr.join(', ')}`);
  }

  static isArray(data: any, fieldName: string) {
    if (!Array.isArray(data)) {
      throw new Error(`${fieldName} must be aray`);
    }
  }

  static isString(data: any, fieldName: string, isStringOpt?: isString) {
    if (isStringOpt?.max) {
      if (data.length > isStringOpt?.max) {
        throw new Error(`${fieldName} length must not greater than ${isStringOpt.max}`);
      }
    }
    if (isStringOpt?.min) {
      if (data.length < isStringOpt?.min) {
        throw new Error(`${fieldName} must be ${isStringOpt.min} long`);
      }
    }
  }
  static startsWith(data: any, fieldName: string, startswith: string) {
    const regex = new RegExp(`^${startswith}.*$`);
    const valid = regex.test(data);
    if (!valid) {
      throw new Error(`${fieldName} must start with ${startswith}`);
    }
  }
}
