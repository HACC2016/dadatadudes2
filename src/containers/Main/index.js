import React, { Component, PropTypes } from 'react';
import { main as actions } from './module';
import { connect } from 'react-redux';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';

export class Main extends Component {
  componentWillMount() {
  	// TODO: Add auth
  }

  render() {
  	console.log('hell yea');
    const { children } = this.props;

    return (
      <App centered={false}>
        <Split
          inline={true}
          fixed={true}
          flex="right"
          priority="right">

          {children}
        </Split>
      </App>
    );
  }
}

export const stateToProps = state => ({
  ...state
});

export default connect(stateToProps, actions)(Main);