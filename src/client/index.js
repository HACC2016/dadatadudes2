import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet } from 'aphrodite';
import { ApolloProvider } from 'react-apollo';
import { browserHistory } from 'react-router';
import App from '../containers/App';
import Store from '../store';
import ApolloClientSingleton from '../network/apollo-client-singleton';

const store = new Store(browserHistory, window.INITIAL_STATE);

StyleSheet.rehydrate(window.RENDERED_CLASS_NAMES);

ReactDOM.render(
  <ApolloProvider store={store.data} client={ApolloClientSingleton}>
    <App />
  </ApolloProvider>,
  document.getElementById('mount')
);

  