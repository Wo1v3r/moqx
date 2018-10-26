import {
  IModelType,
  ModelInstanceType,
  ModelProperties
} from 'mobx-state-tree';
import { reduceActions, reducePrimitives, reduceViews } from './core';

export const mock = <P extends ModelProperties, O>(model: IModelType<P, O>) => {
  const mockProps = reducePrimitives(model.properties);

  const [viewInitializers, actionInitializers] = model['initializers'].reduce(
    ([views, actions], initializer) => [
      [
        ...views,
        ...(initializer.name === 'viewInitializer' ? [initializer] : [])
      ],
      [
        ...actions,
        ...(initializer.name === 'actionInitializer' ? [initializer] : [])
      ]
    ],
    [[], []]
  );

  const mockActions = reduceActions(actionInitializers);
  const mockViews = reduceViews(viewInitializers);

  return { ...mockProps, ...mockActions, ...mockViews } as ModelInstanceType<
    P,
    O,
    any,
    any
  >;
};
