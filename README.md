# object-validator
Easy to use decorator for model checking. 

## Insert a decorator to a model
```
import { mv } from "loztorh-model-validator";

class foo {
  @mv.checkNum.type()
  baz?: number;

  @mv.required()
  @mv.checkStr.len(0,10)
  bar: string;

  constructor() {
    this.bar = "";
  }
}
```

## Vaildate param in a function
```
import { mv } from "loztorh-model-validator";

class Controller {
  @mv.vaildateParam(0, foo)
  test(value: foo) {
    return null;
  }
}
```

## Customizable vaildator
```
import { validate } from "loztorh-model-validator";

class foo {
  @validate((value, name) => {
    if (value.field != "bar") {
      throw new Error("field bar must be bar");
    }
  })
  bar?: string;
}
```