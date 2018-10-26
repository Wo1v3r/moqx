import * as Chance from 'chance';

const chance = new Chance();

const mockNumber = () => chance.floating();
const mockInteger = () => chance.integer();
const mockString = () => chance.string();
const mockNull = () => null;
const mockBoolean = () => chance.bool();

export const mockPrimitive = {
  boolean: mockBoolean,
  integer: mockInteger,
  null: mockNull,
  number: mockNumber,
  string: mockString
};
