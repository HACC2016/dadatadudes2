import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Chart from 'grommet/components/Chart';
import Base from 'grommet/components/Chart/Base';
import Bar from 'grommet/components/Chart/Bar';

class RiskScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <Article pad={{vertical: 'small'}}>
        <Heading align="center" tag="h4">Islands</Heading>
        <Box 
          align="center" 
          justify="center">
          <Menu inline={true} direction="row">
            <Anchor>Oahu</Anchor>
            <Anchor>Maui</Anchor>
            <Anchor>Hawaii</Anchor>
            <Anchor>Kauai</Anchor>
          </Menu>
        </Box>
      </Article>
    );
  }
}

// const personsQuery = 
//   gql`
//   query {
//     persons {
//       _id
//       firstName
//       lastName
//       assessmentIds
//       assessments {
//         _id
//         personId
//         overallRiskScore
//         preSurveyScore
//         historyOfHousingAndHomelessnessScore
//         risksScore
//         socializingAndDailyFunctionsScore
//         wellnessScore
//       }
//     }
//   } `;

// const listPersons = graphql(personsQuery, {
//   props: ({ data }) => ({ 
//     response: data ? data : []
//   })
// });

export default RiskScore;