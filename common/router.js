import React from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/App';
import About from './routes/About';

export const routes = (
  <div>
    <Route path="/" component={App} />
    <Route path="/about" component={About} />
  </div>
);

export default function({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}
