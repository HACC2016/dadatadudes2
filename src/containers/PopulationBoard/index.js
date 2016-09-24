import React, { Component } from 'react';
import './index.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Index from 'grommet-index/components/Index';
import Article from 'grommet/components/Article';
import Notification from 'grommet/components/Notification';

import attributes from './attributes';

import PersonRecord from '../../components/PersonRecord';
import EmptyList from '../../components/EmptyList';
import PersonDetailsLayer from '../../components/PersonDetailsLayer';

const personsQuery =
  gql`
  query {
    persons(offset: 0, limit: 50) {
      _id
      firstName
      lastName,
      age,
      gender
      ethnicity
      employmentStatus
      familyMembersChildren
      districtId,
      assessments {
        _id
        personId
        overallRiskScore
        preSurveyScore
        historyOfHousingAndHomelessnessScore
        risksScore
        socializingAndDailyFunctionsScore
        wellnessScore
      }
    }
  } `;

const listPersons = graphql(personsQuery, {
  options: { pollInterval: 10000 },
  props: ({ data }) => ({
    persons: data.persons ? data.persons : [],
    fetchMore: data.fetchMore,
  })
});

class PopulationBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      filter: { assessments: [] },
      sort: 'districtId:asc',
      query: '',
      result: {
        items: [],
        start: 0,
        count: 2,
        total: 2,
        unfilteredTotal: 2
      },
    };
    this._handleFiltering = this._handleFiltering.bind(this);
    this._onFilter        = this._onFilter.bind(this);
    this._onSort          = this._onSort.bind(this);
    this._onSearch        = this._onSearch.bind(this);
    this._closeLayer      = this._closeLayer.bind(this);
    this._openLayer       = this._openLayer.bind(this);
    this._findPerson      = this._findPerson.bind(this);
    this._onMore          = this._onMore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.persons) {
      this.setState({
        result: {
          items: nextProps.persons,
          start: 0,
          count: nextProps.persons.length,
          total: nextProps.persons.length,
          unfilteredTotal: nextProps.persons.length,
        },
        personsList: {
          items: nextProps.persons,
          start: 0,
          count: nextProps.persons.length,
          total: nextProps.persons.length,
          unfilteredTotal: nextProps.persons.length,
        }
      });
    }
  }

  _onMore() {
    this.props.fetchMore({variables: {offset: 50, limit: 50}});
  }

  _handleFiltering() {
    const { filter, sort, query, personsList } = this.state;
    const filtered = personsList.items.filter(person => {
      const matchesSearch = person.lastName.toLowerCase().includes(query.toLowerCase());
      let matchesFilter;
      if (filter.assessments[0] === 'yes') {
        matchesFilter = Array.isArray(person.assessments);
      } else if (filter.assessments[0] === 'no') {
        matchesFilter = !person.assessments;
      } else {
        matchesFilter = true;
      }
      return matchesSearch && matchesFilter;
    });
    const sortType = sort.split(':')[0];
    const sortResult = (filtered) => {
      const firstSort = filtered.sort((a, b) => {
        const first = a[sortType].split('-')[0];
        const second = b[sortType].split('-')[0]
        if (first < second) return 1;
        if (first > second) return -1;
        if (first === second) return 0;
      });
      return firstSort.sort((c, d) => {
        const prev = c[sortType].split('-')[1]; 
        const cur = c[sortType].split('-')[1];
        if (prev < cur) return 1;
        if (prev > cur) return -1;
        if (prev === cur) return 0;
      });
    };
    const sorted = sortResult(filtered);
    this.setState({result: {
      items: sorted,
      total: filtered.length,
      start: 0,
      count: 10,
      unfilteredTotal: filtered.length,
    }});
  }

  _onFilter(filterType) {
    this.setState({filter: filterType}, this._handleFiltering);
  }

  _onSort(sortType) {
    this.setState({sort: sortType}, this._handleFiltering);
  }

  _onSearch({text}) {
    this.setState({query: text}, this._handleFiltering);
  }

  _closeLayer() {
    this.setState({
      showDetails: false,
      notification: false,
    });
  }

  _openLayer(id, assessments) {
    if (!assessments) {
      return this.setState({notification: true});
    }
    this.setState({
      showDetails: true,
      id: id,
    });
  }

  _findPerson(id) {
    const {persons} = this.props;
    return persons.find(({_id}) => _id === this.state.id);
  }

  render() {
    const data = {
      ...this.state.result,
      items: this.state.result.items.map((person) => {
        return {...person, openLayer: this._openLayer};
      })
    };
    return (
      <Article>
        {this.state.notification &&
          <Notification
            message="No Assessment Exists for this Person"
            closer={true}
            onClose={this._closeLayer}
            status="warning"
          />
        }
        <Index
          view={{medium: 'table', small: 'tiles'}}
          fill={false}
          selectable={true}
          flush={false}
          onSort={this._onSort}
          onFilter={this._onFilter}
          onQuery={this._onSearch}
          itemComponent={PersonRecord}
          attributes={attributes}
          data={data}
          filter={this.state.filter}
          sort={this.state.sort}
          onMore={this._onMore}
          label="Population Board"
          emptyMessage={<EmptyList />}
          emptyAddControl={<noscript/>}/>
        {this.state.showDetails &&
          <PersonDetailsLayer
            personDetails={this._findPerson()}
            onClose={this._closeLayer} />
        }
      </Article>
    );
  }
};

export default listPersons(PopulationBoard);
