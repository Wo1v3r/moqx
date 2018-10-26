import { types } from 'mobx-state-tree';
import { mock } from '../src';

const Primitives = types.model('Primitives', {
  boolean: types.boolean,
  integer: types.integer,
  null: types.null,
  number: types.number,
  string: types.string
});

describe('Primitives', () => {
  let primitives: typeof Primitives.Type;

  beforeEach(() => (primitives = mock(Primitives)));

  test('it mocks a number', () => {
    expect(types.number.is(primitives.number)).toBe(true);
  });

  test('it mocks an integer', () => {
    expect(types.integer.is(primitives.integer)).toBe(true);
  });

  test('it mocks a string', () => {
    expect(types.string.is(primitives.string)).toBe(true);
  });

  test('it mocks a null', () => {
    expect(types.null.is(primitives.null)).toBe(true);
  });

  test('it mocks a boolean', () => {
    expect(types.boolean.is(primitives.boolean)).toBe(true);
  });
});
