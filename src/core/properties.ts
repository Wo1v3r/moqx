import { mockPrimitive } from './mockers';

export const reducePrimitives = primitives =>
  Object.keys(primitives).reduce(
    (props, prop) => ({
      ...props,
      [prop]: mockPrimitive[primitives[prop].name]()
    }),
    {}
  );
