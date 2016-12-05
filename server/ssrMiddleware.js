import { match, RoutingContext, createMemoryHistory } from 'dva/router';
import { renderToString } from 'react-dom/server'
import { fetchList } from '../common/services/user';
import { routes } from '../common/router';
import createApp from '../common/createApp';

export default function(req, res) {
  match({
    routes,
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      switch (renderProps.location.pathname) {
        case '/':
          fetchList()
            .then(({ err, data }) => {
              if (err) {
                res.status(500).end(`Uncaught error: ${err}`);
                return;
              }
              const initialState = { user: data };
              const app = createApp({
                history: createMemoryHistory(),
                initialState,
              }, /* isServer */true);
              const html = renderToString(app.start()({ renderProps }));
              res.end(renderFullPage(html, initialState));
            });
          break;
        case '/about':
          const app = createApp({
            history: createMemoryHistory(),
          }, /* isServer */true);
          const html = renderToString(app.start()({ renderProps }));
          res.end(renderFullPage(html, {}));
          break;
        default:
          res.status(500).end(`Uncaught pathname: ${renderProps.location.pathname}`);
          break;
      }
    } else {
      res.status(404).send('Not found')
    }
  });
}

function renderFullPage(html, initialState) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="/static/index.css" />
</head>
<body>
  <div id="root">
    <div>
      ${html}
    </div>
  </div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
  </script>
  <script src="/static/index.js"></script>
</body>
</html>
  `;
}
