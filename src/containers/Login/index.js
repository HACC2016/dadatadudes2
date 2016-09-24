import React, { Component, PropTypes } from 'react';
import { login as actions } from './module';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import './index.css';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import LoginForm from 'grommet/components/LoginForm';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Hero from 'grommet/components/Hero';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Quote from 'grommet/components/Quote';
import Paragraph from 'grommet/components/Paragraph';
import BarChartIcon from 'grommet/components/icons/base/BarChart';
import ValidationIcon from 'grommet/components/icons/base/Validation';
import QuickViewIcon from 'grommet/components/icons/base/QuickView';
import Label from 'grommet/components/Label';

const loginUrl = `/login`;

class Login extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);

    this.state = {
      errors: [],
      showLogin: false,
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

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return fetch(loginUrl, {
      method: 'POST',
      headers,
      credentials: 'include',
      body
    })
    .then((response) => response.json())
    .then(({data}) => {
      console.log(data, 'data');
      localStorage.setItem('userId', data.userId);
      window.location.assign('/dashboard');
    })
    .catch(err => {
      this.setState({errors: ['Failed Login']});
      console.error(err, 'error');
    });
  }

  render() {
    return (
      <Article colorIndex="light-2" justify="between">
        <Section align="center" justify="center">
          <Hero 
            backgroundImage="http://www.trbimg.com/img-5647dbfc/turbine/la-adna-hawaii-homeless-20151115">
           <h1>HOME Dashboard</h1>
           <Button 
             label="Sign In" 
             onClick={() => this.setState({showLogin: true})} />
          </Hero>
        </Section>
        <Section 
          direction="row" 
          justify="between" 
          pad={{vertical: 'medium', horizontal: 'large'}}>
          <Box 
            align="center" 
            direction="column" 
            pad={{horizontal: 'large', vertical: 'small'}}>
            <Label uppercase={true}>Analyze Data</Label>
            <BarChartIcon size="large" />
          </Box>
          <Box 
            align="center"
            direction="column" 
            pad={{horizontal: 'large', vertical: 'small'}}>
            <Label uppercase={true}>VI-SPDAT Integration</Label>
            <ValidationIcon size="large" />
          </Box>
          <Box  
            align="center"
            direction="column"
            pad={{horizontal: 'large', vertical: 'small'}}>
            <Label uppercase={true}>View Population</Label>
            <QuickViewIcon size="large" />
          </Box>
        </Section>
        {this.state.showLogin ? 
        <Layer onClose={() => this.setState({showLogin: false})}>
          <LoginForm
            secondaryText="Welcome"
            onSubmit={this._onSubmit}
            errors={this.state.errors}/>
        </Layer> : null
        }
      </Article>
    );
  }
}

export const stateToProps = state => ({
  ...state
});

export default connect(stateToProps, actions)(Login);
