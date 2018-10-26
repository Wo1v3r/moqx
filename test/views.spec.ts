import { getEnv, types } from 'mobx-state-tree';
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
    get envValue() {
      return (getEnv(model).value || (_ => _))(model._string);
    }
  }));

describe('views', () => {
  it('mocks via properties', () => {
    const views: typeof Views.Type = mock(Views);

    expect(typeof views.number).toEqual('number');
    expect(typeof views.string).toEqual('string');
    expect(typeof views.boolean).toEqual('boolean');
    expect(typeof views.object).toEqual('object');
  });

  it('mocks via environment', () => {
    const value = (key: string) => `ENV ${key}`;

    const views: typeof Views.Type = mock(Views, {}, { value });

    expect(views.envValue).toEqual(`ENV ${views._string}`);
  });

  it('patches views', () => {
    const patch = {
      boolean: false,
      number: 5,
      object: { othervalue: 5 },
      string: '1'
    };

    const views: typeof Views.Type = mock(Views, patch);

    expect(views.boolean).toEqual(patch.boolean);
    expect(views.number).toEqual(patch.number);
    expect(views.object).toEqual(patch.object);
    expect(views.string).toEqual(patch.string);
  });
});
