import { types } from 'mobx-state-tree';
import { mock } from '../src';

const Views = types
  .model('Views', {
    prop1: types.string
  })
  .actions(model => ({
    stuff: () => 'stuff'
  }))
  .views(model => ({
    get string() {
      return model.prop1;
    }
  }));

describe('views', () => {
  let views: typeof Views.Type;
  beforeEach(() => (views = mock(Views)));

  it('mocks a view', () => {
    expect(types.string.is(views.string)).toBe(true);
  });
});
