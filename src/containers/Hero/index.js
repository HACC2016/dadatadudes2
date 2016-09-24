import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Hero from 'grommet/components/Hero';

class HeroPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    };
  }

  render() {
    return (
      <Hero />
    );
  }
}

export default HeroPage;