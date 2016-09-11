import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { StyleSheetServer } from 'aphrodite';
import { ApolloProvider } from 'react-apollo';
import Store from '../../store';
import routes from '../../routes.jsx';
import ApolloClientSingleton from '../../network/apollo-client-singleton';
import renderIndex from './render-index';

const assetMap = {
  'bundle.js': 'bundle.js'
};

export default (async (req, res) => {
  const memoryHistory = createMemoryHistory(req.url);
  const store = new Store(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store.data);

  match({
    history,
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const { html, css } = StyleSheetServer.renderStatic(() => renderToString(
        <ApolloProvider store={store.data} client={ApolloClientSingleton}>
          <RouterContext {...renderProps} />
        </ApolloProvider>
      ));

      res.send(renderIndex(html, css, assetMap, store.data));
    } else {
      res.status(404).send('Not found');
    }
  });
});
