import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';
import router from './router';
import user from './models/user';

export default function createApp(opts, isServer) {
  const app = dva(opts);
  app.model(user);
  if (isServer) {
    app.router(({ history, renderProps}) => {
      return <RouterContext {...renderProps} />;
    });
  } else {
    app.router(router);
  }
  return app;
}
