import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Chart from 'grommet/components/chart/Chart';
import Layers from 'grommet/components/chart/Layers';
import Base from 'grommet/components/chart/Base';
import Bar from 'grommet/components/chart/Bar';
import Button from 'grommet/components/Button';
import AnalyticsIcon from 'grommet/components/icons/base/Analytics';
import ResourcesIcon from 'grommet/components/icons/base/Resources';


class RiskScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  _selectIsland() {

  }

  _selectCategory() {

  }

  render() {
    return (
      <Article direction="column" justify="start">
        <Box>
          <Heading align="center" tag="h4">Islands</Heading>
          <Box 
            align="center" 
            justify="center">
            <Menu inline={true} direction="row">
              <Anchor onClick={() => this._selectIsland('oahu')}>Oahu</Anchor>
              <Anchor onClick={() => this._selectIsland('maui')}>Maui</Anchor>
              <Anchor onClick={() => this._selectIsland('hawaii')}>Hawaii</Anchor>
              <Anchor onClick={() => this._selectIsland('kauai')}>Kauai</Anchor>
            </Menu>
          </Box>
          <Box 
            justify="between" 
            direction="row"
            pad={{horizontal: 'large'}}>
            <Button 
              accent={true}
              onClick={() => this._selectCategory('numberOf')}
              label="Number of Homeless" 
              icon={<ResourcesIcon />} />
            <Button 
              accent={true}
              onClick={() => this._selectCategory('riskScore')}
              label="Risk Score Percentage" 
              icon={<AnalyticsIcon />} />
          </Box>
        </Box>
        <Box>
          <Chart full={true}>
            {/*<Axis 
              vertical={true} 
              count={4} 
              labels={[
                {index: 3, label: `${max(values)} ${unit}`},
                {index: 1, label: `${max(values) / 2} ${unit}`}
              ]} 
              ticks={true} />*/}
            <Base height="small" width="full"/>
            <Layers>
              <Bar 
                colorIndex="accent-1"
                values={[55, 46, 59]} />
            </Layers>
          </Chart>
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