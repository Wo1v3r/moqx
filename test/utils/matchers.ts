import { types } from 'mobx-state-tree';

expect.extend({
  isTypeOf(actual: any, type: any) {
    const pass = types[type].is(actual);

    return pass
      ? {
          message: () => `Expected ${actual} not to be of MST type ${type}`,
          pass: true
        }
      : {
          message: () => `Expected ${actual} to be of MST type ${type}`,
          pass: false
        };
  }
});
