import React, { Component, PropTypes } from 'react';
import { login as actions } from './module';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import LoginForm from 'grommet/components/LoginForm';
import Image from 'grommet/components/Image';

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
     return this.setState({errors: ['Username and Password are Required']});
    }
    browserHistory.push('/dashboard'); // Remove once redux is implemented
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
          <LoginForm
            logo={
              <Image 
                size="small"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Seal_of_the_State_of_Hawaii.svg/2000px-Seal_of_the_State_of_Hawaii.svg.png" />
            }
            secondaryText="Welcome"
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