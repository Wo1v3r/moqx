export const reduceViews = initializers =>
  initializers.reduce((views, initializer) => {
    const extractAction = new Proxy(
      {},
      {
        get(_, key) {
          if (typeof key === 'string' && key !== 'inspect') {
            views = {
              ...views,
              [key]: key
              // FIXME:  How the hell can this type be infered
            };
          }
        }
      }
    );
    initializer(extractAction);
    return views;
  }, {});
