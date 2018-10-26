import {
  IModelType,
  ModelInstanceType,
  ModelProperties
} from 'mobx-state-tree';
import { extractViews, reduceActions, reducePrimitives } from './core';

export const mock = <P extends ModelProperties, O>(model: IModelType<P, O>) => {
  const mockProps = reducePrimitives(model.properties);

  const actionInitializers = model['initializers'].filter(
    ({ name }) => name === 'actionInitializer'
  );

  const mockActions = reduceActions(actionInitializers);

  const mockViews = extractViews(model, mockProps);

  return { ...mockProps, ...mockActions, ...mockViews } as ModelInstanceType<
    P,
    O,
    any,
    any
  >;
};
