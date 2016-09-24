import React from 'react';
import {Router, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../../routes';
import Store from '../../store';
const store = new Store(browserHistory, window.INITIAL_STATE);
const history = syncHistoryWithStore(browserHistory, store.data);
import '../../index.scss';


export default function App() {
  return (
    <div>
      <Router history={history}>{routes}</Router>
    </div>
  );
}

