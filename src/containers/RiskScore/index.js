import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Header from 'grommet/components/Header';
import Value from 'grommet/components/Value';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Chart from 'grommet/components/chart/Chart';
import Layers from 'grommet/components/chart/Layers';
import Base from 'grommet/components/chart/Base';
import Bar from 'grommet/components/chart/Bar';
import MarkerLabel from 'grommet/components/chart/MarkerLabel';
import Marker from 'grommet/components/chart/Marker';
import HotSpots from 'grommet/components/chart/HotSpots';
import Button from 'grommet/components/Button';
import Axis from 'grommet/components/chart/Axis';
import AnalyticsIcon from 'grommet/components/icons/base/Analytics';
import ResourcesIcon from 'grommet/components/icons/base/Resources';


class RiskScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      districts: [
        {count: 55},
        {count: 34},
        {count: 87},
        {count: 33},
        {count: 23},
        {count: 95},
        {count: 59},
        {count: 36},
        {count: 86},
      ],
      activeIndex: 0,
      values: [],
      chartTitle: '# of Homeless by District'
    };

    this._onActive = this._onActive.bind(this);
  }

  _selectIsland() {
    // const values = this.state.districts.map(({}) =>)
    this.setState({values: []});
  }

  _selectCategory() {

  }

  _onActive(activeIndex) {
    this.setState({activeIndex});
  }

  render() {
    const { districts, activeIndex, chartTitle } = this.state;
    const getMaxVal = (arr) => Math.max.apply(Math, arr);
    const values = districts.map(({count}) => count);
    return (
      <Article direction="column" pad={{vertical: 'large'}}>
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
        <Box pad={{vertical: 'large'}}>
          <Heading tag="h3" align="center">
            {chartTitle}
          </Heading>
        </Box>
        <Box pad={{horizontal: 'medium', vertical: 'large'}}>
          <Chart full={true}>
            <MarkerLabel 
              count={values.length} 
              index={activeIndex} 
              label={<Value value={values[activeIndex]} />} />
            <Axis 
              vertical={true} 
              count={4} 
              labels={[
                {index: 3, label: `${getMaxVal(values)}`},
                {index: 1, label: `${getMaxVal(values) / 2}`}
              ]} 
              ticks={true} />
            <Base height="medium" width="full"/>
            <Layers>
              <Marker 
                vertical={true} 
                colorIndex="graph-2" 
                count={values.length} 
                index={activeIndex} />
              <Bar 
                colorIndex="accent-1"
                values={values}
                activeIndex={activeIndex} />
              <HotSpots 
                count={values.length} 
                activeIndex={activeIndex} 
                onActive={this._onActive} />
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