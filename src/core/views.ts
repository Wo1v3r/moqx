import { getMembers } from 'mobx-state-tree';
import { mockPrimitive } from './mockers';

export const extractViews = (model, props) => {
  const instance = model.create(props);

  return getMembers(instance)
    .views.filter(view => view !== 'toJSON' && view !== '$treenode')
    .reduce((views, view) => {
      return {
        ...views,
        [view]: mockPrimitive[typeof instance[view]]()
      };
    }, {});
};
