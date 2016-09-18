import React from 'react';
import { Route, Redirect } from 'react-router';
import Dashboard from './containers/Dashboard';
import Main from './containers/Main';

export default (
  <Route>
    
  	<Route path="/">
  	  <Route component={Main}>
  	  </Route>
    </Route>
  </Route>
);
