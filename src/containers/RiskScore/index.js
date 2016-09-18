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
import Button from 'grommet/components/Button';
import AnalyticsIcon from 'grommet/components/icons/base/Analytics';
import ResourcesIcon from 'grommet/components/icons/base/Resources';


class RiskScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
    this._selectIsland   = this._selectIsland.bind(this);
    this._selectCategory = this._selectCategory.bind(this);
  }

  _selectIsland() {

  }

  _selectCategory() {

  }
  
  render() {
    return (
      <Article direction="column" justify="start">
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
        <Box 
          justify="between" 
          direction="row"
          pad={{horizontal: 'large'}}>
          <Button 
            accent={true}
            onClick={() => {}}
            label="Number of Homeless" 
            icon={<ResourcesIcon />} />
          <Button 
            accent={true}
            onClick={() => {}}
            label="Risk Score Percentage" 
            icon={<AnalyticsIcon />} />
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