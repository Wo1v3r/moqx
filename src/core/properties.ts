import * as Chance from 'chance';
import { mockPrimitive } from './mockers';

const chance = new Chance();

const mockEnumeration = ({ types }) =>
  chance.pickone(types.map(({ value }) => value));

const mockProperty = prop => {
  // FIXME: actually, is union
  const isEnum = !!prop.types;
  const isPrimitive = prop.name in mockPrimitive;

  return isEnum
    ? mockEnumeration(prop)
    : isPrimitive
      ? mockPrimitive[prop.name]()
      : null;
};

export const reduceProperties = properties =>
  Object.keys(properties).reduce((props, prop) => {
    return {
      ...props,
      [prop]: mockProperty(properties[prop])
    };
  }, {});
