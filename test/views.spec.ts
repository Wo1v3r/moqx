import { types } from 'mobx-state-tree';
import { mock } from '../src';

const Views = types
  .model('Views', {
    _number: types.number,
    _string: types.string
  })
  .views(model => ({
    get number() {
      return parseInt(model._string, 10);
    },
    get string() {
      return model._number.toString();
    },
    get boolean() {
      return model._number % 2 === 0;
    },
    get object() {
      return { number: model._number, string: model._string };
    },
    get array() {
      return [];
    }
  }));

describe('views', () => {
  let views: typeof Views.Type;
  beforeEach(() => (views = mock(Views)));

  it('mocks a number view', () => {
    expect(typeof views.number).toEqual('number');
  });

  it('mocks a string view', () => {
    expect(typeof views.string).toEqual('string');
  });

  it('mocks a boolean view', () => {
    expect(typeof views.boolean).toEqual('boolean');
  });

  it('mocks an object view', () => {
    expect(typeof views.object).toEqual('object');
  });

  it('mocks an array view', () => {
    expect(Array.isArray(views.array)).toBe(true);
  });
});
