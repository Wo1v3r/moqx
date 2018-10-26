import {
  IModelType,
  ModelInstanceType,
  ModelProperties
} from 'mobx-state-tree';
import { reduceActions, reducePrimitives } from './core';

export const mock = <P extends ModelProperties, O>(model: IModelType<P, O>) => {
  const mockProps = reducePrimitives(model.properties);
  const mockActions = reduceActions(model['initializers']);

  return { ...mockProps, ...mockActions } as ModelInstanceType<P, O, any, any>;
};
