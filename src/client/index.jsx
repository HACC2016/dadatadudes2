import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { StyleSheet } from 'aphrodite';
import { ApolloProvider } from 'react-apollo';
import routes from '../routes';
import Store from '../store';
import ApolloClientSingleton from '../network/apollo-client-singleton';

const store = new Store(browserHistory, window.INITIAL_STATE);
const history = syncHistoryWithStore(browserHistory, store.data);

StyleSheet.rehydrate(window.RENDERED_CLASS_NAMES);

ReactDOM.render(
  <ApolloProvider store={store.data} client={ApolloClientSingleton}>
    <Router history={history} routes={routes} />
  </ApolloProvider>,
  document.getElementById('mount')
);
