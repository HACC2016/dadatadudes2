import React, { Component, PropTypes } from 'react';
import { login as actions } from './module';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { API_SERVER } from '../../../config'; 

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import LoginForm from 'grommet/components/LoginForm';
import Image from 'grommet/components/Image';

const loginUrl = `/login`;

class Login extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);

    this.state = {
      errors: [],
    };
  }

  _onSubmit({username, password}) {
    this.setState({errors: []});
    if (!username || !password) {
     return this.setState({errors: ['Email and Password are Required']});
    }
    const body = JSON.stringify({
      email: username,
      password: password
    });
    return fetch(loginUrl, {
      method: 'post',
      credentials: 'include',
      body
    }) 
    .then((response) => response.json())
    .then(({data}) => {
      console.log(data, 'data');
      localStorage.set('userId', data.userId);
      window.location.assign('/dashboard');
    })
    .catch(err => {
      this.setState({errors: ['Failed Login']});
      console.error(err, 'error');
    });
  }

  render() {
    return (
      <Article>
        <Section align="center" justify="center">
          <LoginForm
            title="Welcome"
            secondaryText="HOME Dashboard"
            onSubmit={this._onSubmit} 
            errors={this.state.errors}/>
        </Section>
      </Article>
    );
  }
}

export const stateToProps = state => ({
  ...state
});

export default connect(stateToProps, actions)(Login);