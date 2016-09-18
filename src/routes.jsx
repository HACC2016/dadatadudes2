import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Dashboard from './containers/Dashboard';
import Main from './containers/Main';

export default (
  <Route path="/">
  	<Route component={Main}>
      <IndexRedirect to="/dashboard" />
      <Route path="dashboard" component={Dashboard} />
    </Route>
  </Route>
);
