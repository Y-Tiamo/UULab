import React from 'react';
import { create } from 'dva-core';
import { Provider, connect } from 'react-redux';
import createLoading from 'dva-loading-ts';
/**----------------------------------------------------------------*/

export { connect };

export default function (options) {
  const app = create(options);
  // HMR workaround
  if (!global.registered) options.models.forEach(model => app.model(model));
  global.registered = true;
  app.use(createLoading());
  app.start();
  // eslint-disable-next-line no-underscore-dangle

  const store = app._store;
  app.startApp = container => () => <Provider store={store}>{container}</Provider>;
  app.getStore = () => store;
  return app;
}
