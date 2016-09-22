import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import Main from './containers/Main';
import Login from './containers/Login';
import PopulationBoard from './containers/PopulationBoard';
import RiskScore from './containers/RiskScore';
import Hero from './containers/Hero';

export default (
  <Route>
    <Redirect from="/" to="/login" />
    <Route path="/">
      <Route path="hero" component={Hero} />
      <Route path="login" component={Login} />    
      <Route component={Main}>	
        <Route path="dashboard" component={PopulationBoard} />
        <Route path="risk-score" component={RiskScore} />
      </Route>
    </Route>
  </Route>
);
