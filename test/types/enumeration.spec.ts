import { types } from 'mobx-state-tree';
import { mock } from '../../src';

const options = ['Option1', 'Option2', 'Option3'];

type IEnumeration = typeof Enumeration.Type;
const Enumeration = types.model('Enumeration', {
  value: types.enumeration(options)
});

describe('Enumeration', () => {
  it('picks literal from enumeration options', () => {
    const enumeration: IEnumeration = mock(Enumeration);

    expect(options.indexOf(enumeration.value) !== -1).toBe(true);
  });
});
