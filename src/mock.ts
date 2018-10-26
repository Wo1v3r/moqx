import {
  IModelType,
  ModelInstanceType,
  ModelProperties
} from 'mobx-state-tree';
import { reduceActions, reduceProperties, reduceViews } from './core';

export const mock = <P extends ModelProperties, O>(
  model: IModelType<P, O>,
  // FIXME: types
  patch = {},
  environment = {}
) => {
  const actionInitializers = model['initializers'].filter(
    ({ name }) => name === 'actionInitializer'
  );

  const mockProps = reduceProperties(model.properties);

  return {
    ...mockProps,
    ...reduceActions(actionInitializers),
    ...reduceViews(model, { ...mockProps, ...patch }, environment),
    ...(patch as any)
  } as ModelInstanceType<P, O, any, any>;
};
