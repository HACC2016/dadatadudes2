import React, { Component, PropTypes } from 'react';
import '../../index.scss';
import { Login as actions } from './module';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import LoginForm from 'grommet/components/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillMount() {
  	// TODO: Add auth
  }

  _onSubmit() {
    console.log('Loggin in');
  }

  render() {
    return (
      <Article>
        <LoginForm
          onSubmit={this._onSubmit} />
      </Article>
    );
  }
}

export const stateToProps = state => ({
  ...state
});

export default connect(stateToProps, actions)(Login);