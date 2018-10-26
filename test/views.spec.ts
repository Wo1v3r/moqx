import { types } from 'mobx-state-tree';
import { mock } from '../src';

const Views = types
  .model('Views', {
    prop1: types.optional(types.string, '10')
  })
  .views(model => ({
    get number() {
      return parseInt(model.prop1, 10);
    }
  }));

describe('views', () => {
  let views: typeof Views.Type;
  beforeEach(() => (views = mock(Views)));

  it('mocks a view', () => {
    expect(typeof views.number).toEqual('number');
  });
});
