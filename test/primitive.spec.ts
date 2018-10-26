import { types } from 'mobx-state-tree';
import { mock } from '../src';

type IPrimitives = typeof Primitives.Type;
const Primitives = types.model('Primitives', {
  boolean: types.boolean,
  integer: types.integer,
  null: types.null,
  number: types.number,
  string: types.string
});

describe('Primitives', () => {
  describe('types', () => {
    const primitives: IPrimitives = mock(Primitives);

    expect(types.number.is(primitives.number)).toBe(true);
    expect(types.string.is(primitives.string)).toBe(true);
    expect(types.integer.is(primitives.integer)).toBe(true);
    expect(types.null.is(primitives.null)).toBe(true);
    expect(types.boolean.is(primitives.boolean)).toBe(true);
  });

  test('it patches', () => {
    const primitives: IPrimitives = mock(Primitives, { number: 5 });

    expect(primitives.number).toEqual(5);
  });
});
