import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.babel';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // webpack compile
  const compiler = webpack(config);
  const options = {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {colors: true},
  };
  app.use(require('webpack-dev-middleware')(compiler, options));
  app.use(require('webpack-hot-middleware')(compiler));

  // mock
  app.use(require('./mockMiddleware'));
}

app.use(require('./ssrMiddleware'));
app.disable('x-powered-by');

const server = app.listen(8080, () => {
  const { port } = server.address();
  console.info(`Listened at http://localhost:${port}`);
});
