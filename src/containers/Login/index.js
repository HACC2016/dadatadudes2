import React, { Component, PropTypes } from 'react';
import { Login as actions } from './module';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import LoginForm from 'grommet/components/LoginForm';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';

class Login extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);

    this.state = {
      errors: [],
    };
  }

  componentWillMount() {
  	// TODO: Add auth
  }

  _onSubmit({username, password}) {
    this.setState({errors: []});
    if (!username || !password) {
     return this.setState({errors: ['Username and Password are Required']});
    }
    // return this.props.login() 
    //   .then(() => {

    //   })
    //   .catch(err => {
    //     console.error(err, 'error');
    //   });
  }

  render() {
    // const { login } = this.props;
    return (
      <Article>
        <Section align="center" justify="center">
          <Box align="center">
            <Header>
              <Heading>Welcome</Heading>
            </Header>
          </Box>
          <LoginForm
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