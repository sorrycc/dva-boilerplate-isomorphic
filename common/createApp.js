import dva from 'dva';
import router from './router';
import user from './models/user';

export default function createApp(opts) {
  const app = dva(opts);
  app.model(user);
  app.router(router);
  return app;
}
