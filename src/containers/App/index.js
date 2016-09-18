import React from 'react';
import {Router, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { StyleSheet, css } from 'aphrodite';
import routes from '../../routes';
import Store from '../../store';
const store = new Store(browserHistory, window.INITIAL_STATE);
const history = syncHistoryWithStore(browserHistory, store.data);


const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'gray',
    width: '100%'
  }
});

export default function App() {
  return (
    <div>
      <Router history={history}>{routes}</Router>
    </div>
  );
}

