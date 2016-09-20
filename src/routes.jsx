import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import Main from './containers/Main';
import Login from './containers/Login';
import PopulationBoard from './containers/PopulationBoard';
import RiskScore from './containers/RiskScore';

export default (
  <Route>
    <Redirect from="/" to="dashboard" />
    <Route path="/">
      <Route path="login" component={Login} />
      <Route component={Main}>  		
        <Route path="dashboard" component={PopulationBoard} />
        <Route path="risk-score" component={RiskScore} />
      </Route>
    </Route>
  </Route>
);
