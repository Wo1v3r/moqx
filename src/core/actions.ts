export const reduceActions = initializers =>
  initializers.reduce((actions, initializer) => {
    const extractAction = new Proxy(
      {},
      {
        get(_, key) {
          if (typeof key === 'string' && key !== 'inspect') {
            // FIXME: defaulting to a resolved promise as for now flows are not inspected
            actions[key] = jest.fn(() => Promise.resolve());
          }
        }
      }
    );
    initializer(extractAction);
    return actions;
  }, {});
