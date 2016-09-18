import React from 'react';
import { Route, Redirect } from 'react-router';
import Main from './containers/Main';
import Login from './containers/Login';
import PopulationBoard from './containers/PopulationBoard';

export default (
  <Route>
    <Redirect from="/" to="dashboard" />
    <Route component={Main}>  		
      <Route path="login" component={Login} />
      <Route path="dashboard" component={PopulationBoard} />
    </Route>
  </Route>
);
