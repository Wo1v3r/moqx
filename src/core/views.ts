import { getMembers } from 'mobx-state-tree';

export const reduceViews = (model, props, environment) => {
  const instance = model.create(props, environment);

  return getMembers(instance)
    .views.filter(view => view !== 'toJSON' && view !== '$treenode')
    .reduce((views, key) => {
      return {
        ...views,
        [key]: instance[key]
      };
    }, {});
};
