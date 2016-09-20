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

const districtQuery = 
  gql`
  query getDistrict($county: String) {
    district(county: $county) {
      personCount
      averageRisk
      districtId
    }
  } `;

const listDistrictData = graphql(districtQuery, {
  props: ({ data }) => { 
    return {
      districtValues: data ? data.district : [],
      refetch: data.refetch
    }
  },
  options: { variables: { county: 'Honolulu'} }
});


class RiskScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      districtValues: [],
      activeIndex: 0,
      values: [],
      chartTitle: '# of Homeless by District',
      island: 'Oahu',
      category: 'personCount',
    };

    this._onActive = this._onActive.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.districtValues) {
      const { districtValues } = nextProps;
      this.setState({districtValues});
    }
  }

  _selectIsland(island) {
    if (island === 'Oahu') {
      island = 'Honolulu'
    }
    this.props.refetch({county: `${island}`});
    this.setState({island});
  }

  _selectCategory(category) {
    if (category === 'personCount') {
      this.setState({
        chartTitle: '# of Homeless by District',
        category,
      });
    } else {
      this.setState({
        chartTitle: 'Average Risk Score by District',
        category
      });
    }
  }

  _onActive(activeIndex) {
    this.setState({activeIndex});
  }

  render() {
    const { 
      districtValues, 
      activeIndex, 
      chartTitle, 
      island,
      category,
    } = this.state;
    
    const getMaxVal = (arr) => Math.max.apply(Math, arr);
    const getMinVal = (arr) => Math.min.apply(Math, arr);
    const values = districtValues.map((val) => val[category]);
    const labels = districtValues.map((val, index) => ({
      index, 
      label: val.districtId.split('-').pop()
    }));

    return (
      <Article pad={{vertical: 'large'}}>
        <Box>
          <Heading align="center" tag="h4">Counties</Heading>
          <Box 
            align="center" 
            justify="center">
            <Menu inline={true} direction="row">
              <Anchor onClick={() => this._selectIsland('Oahu')}>Oahu</Anchor>
              <Anchor onClick={() => this._selectIsland('Maui')}>Maui</Anchor>
              <Anchor onClick={() => this._selectIsland('Hawaii')}>Hawaii</Anchor>
              <Anchor onClick={() => this._selectIsland('Kauai')}>Kauai</Anchor>
            </Menu>
          </Box>
          <Box 
            justify="between" 
            direction="row"
            pad={{horizontal: 'large'}}>
            <Button 
              accent={true}
              onClick={() => this._selectCategory('personCount')}
              label="Number of Homeless" 
              icon={<ResourcesIcon />} />
            <Button 
              accent={true}
              onClick={() => this._selectCategory('averageRisk')}
              label="Risk Score Percentage" 
              icon={<AnalyticsIcon />} />
          </Box>
        </Box>
        <Box pad={{vertical: 'large'}}>
          <Heading tag="h3" align="center">
            {chartTitle} <strong>{`(${island})`}</strong>
          </Heading>
        </Box>
        <Box pad={{horizontal: 'large'}}>
          <MarkerLabel 
            count={values.length} 
            index={activeIndex} 
            label={<Value value={values[activeIndex]} />} />
          <Chart full={true}>
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
                min={getMinVal(values)}
                max={getMaxVal(values)}
                activeIndex={activeIndex} />
              <HotSpots 
                count={values.length} 
                activeIndex={activeIndex} 
                onActive={this._onActive} />
            </Layers>
          </Chart>
          <Axis  
            count={labels.length} 
            labels={labels} 
            ticks={true} />
        </Box>
      </Article>
    );
  }
}

export default listDistrictData(RiskScore);
