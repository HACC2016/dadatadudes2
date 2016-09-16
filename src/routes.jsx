import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import Dashboard from './containers/Dashboard';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/dashboard" />
    <Route path="dashboard" component={Dashboard} />
  </Route>
);
