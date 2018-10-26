import {
  IModelType,
  ModelInstanceType,
  ModelProperties,
  ModelSnapshotType
} from 'mobx-state-tree';
import { extractViews, reduceActions, reducePrimitives } from './core';

export const mock = <P extends ModelProperties, O>(
  model: IModelType<P, O>,
  patch: Partial<ModelSnapshotType<P>> = {}
) => {
  const mockProps = reducePrimitives(model.properties);

  const actionInitializers = model['initializers'].filter(
    ({ name }) => name === 'actionInitializer'
  );

  const mockActions = reduceActions(actionInitializers);

  const mockViews = extractViews(model, mockProps);

  return {
    ...mockProps,
    ...mockActions,
    ...mockViews,
    ...(patch as any)
  } as ModelInstanceType<P, O, any, any>;
};
