import React, { Component, PropTypes } from 'react';
import { Login as actions } from './module';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import LoginForm from 'grommet/components/LoginForm';

class Login extends Component {
  componentWillMount() {
  	// TODO: Add auth
  }

  render() {
    return (
      <Article>
        <LoginForm />
      </Article>
    );
  }
}

export const stateToProps = state => ({
  ...state
});

export default connect(stateToProps, actions)(Login);