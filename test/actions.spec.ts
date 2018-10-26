import { flow, types } from 'mobx-state-tree';
import { mock } from '../src';

const Actions = types.model('Actions').actions(model => ({
  asyncAction: flow(function*() {
    return model;
  }),
  syncAction: () => model
}));

describe('actions', () => {
  let actions: typeof Actions.Type;

  beforeEach(() => (actions = mock(Actions)));

  it('mocks a sync action', () => {
    const value = 'value';
    actions.syncAction['mockReturnValue'](value);

    expect(actions.syncAction()).toEqual(value);
  });

  // FIXME: ideally, we would like mock to differ between sync \ async to return \ resolve
  it('mocks an async action [flow]', () => {
    const value = 'value';
    actions.asyncAction['mockResolvedValue'](value);

    return actions.asyncAction().then(_ => expect(_).toEqual(value));
  });
});
