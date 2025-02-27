/* eslint-disable @typescript-eslint/no-explicit-any */
const descriptorPrefix = 'func_';
// const descriptorValuePrefix = 'func_val_';
// const descriptorFormatPrefix = 'func_fmt_';

type DecoratorValFunc<T> = (
  value: { field: any; object: any },
  name: string,
  opt?: T
) => void;

type DecoratorFmtFunc<T = any, O = any> = (
  value: { field: T; object: any },
  opt?: O
) => T;

export function intiObject(data: any, objectType: any) {
  const descriptors: PropertyDescriptor | undefined =
    Object.getOwnPropertyDescriptors(objectType.prototype);

  if (descriptors) {
    for (const descriptorKey of Object.keys(descriptors)) {
      const dataKey = descriptorKey.substring(5);
      if (
        descriptorKey.startsWith(descriptorPrefix) &&
        descriptors[`${descriptorKey}`] &&
        descriptors[`${descriptorKey}`].set
      ) {
        descriptors[`${descriptorKey}`].set({
          field: data[dataKey],
          object: data,
        });
      }
    }
  }
}

export function validate<T>(func: DecoratorValFunc<T>, data?: T) {
  return (target: any, name: PropertyKey): void => {
    const prevDescriptor: PropertyDescriptor | undefined =
      Object.getOwnPropertyDescriptor(
        target,
        `${descriptorPrefix}${name.toString()}`
      );
    const descriptor = {
      set: function setter(value: any) {
        func(value, name.toString(), data);
        if (prevDescriptor && prevDescriptor.set) {
          prevDescriptor.set(value);
        }
        //const fieldNameForDisplay = toSnakeCase(name.toString());
      },
      enumerable: true,
      configurable: true,
    };

    Object.defineProperty(
      target,
      `${descriptorPrefix}${name.toString()}`,
      descriptor
    );
  };
}

export function format<T>(func: DecoratorFmtFunc<T>, data?: T) {
  return (target: any, name: PropertyKey): void => {
    const prevDescriptor: PropertyDescriptor | undefined =
      Object.getOwnPropertyDescriptor(
        target,
        `${descriptorPrefix}${name.toString()}`
      );
    const descriptor: PropertyDescriptor = {
      set: function setter(value: any) {
        let newVal = value;
        const newField = func(value, data);
        newVal.field = newField;
        newVal.object[name.toString()] = newField;
        if (prevDescriptor && prevDescriptor.set) {
          newVal = prevDescriptor.set(newVal);
        }

        if (newVal) {
          this.value = newVal.field;
        }
        return newVal ?? (newVal.field || this.value);
        //const fieldNameForDisplay = toSnakeCase(name.toString());
      },
      get: function getter() {
        return this.value;
      },
      enumerable: true,
      configurable: true,
    };

    Object.defineProperty(
      target,
      `${descriptorPrefix}${name.toString()}`,
      descriptor
    );
  };
}
