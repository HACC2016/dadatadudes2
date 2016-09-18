import React, { Component, PropTypes } from 'react';
import { riskScore as actions } from './module';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';

class RiskScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <Article>
        <Section align="center" justify="center">

        </Section>
      </Article>
    );
  }
}

export const stateToProps = state => ({
  ...state
});

export default connect(stateToProps, actions)(RiskScore);