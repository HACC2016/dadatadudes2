import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import Main from './containers/Main';
import Login from './containers/Login';
import PopulationBoard from './containers/PopulationBoard';
import RiskScore from './containers/RiskScore';
import Hero from './containers/Hero';

function requireAuth(nextState, replace) {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return replace('/login');
  }
}

export default (
  <Route>
    <Redirect from="/" to="/login" />
    <Route path="/">
      <Route path="hero" component={Hero} />    
      <Route component={Main}>	
        <Route path="login" component={Login} />
        <Route path="dashboard" component={PopulationBoard} onEnter={requireAuth} />
        <Route path="risk-score" component={RiskScore} onEnter={requireAuth} />
      </Route>
    </Route>
  </Route>
);
