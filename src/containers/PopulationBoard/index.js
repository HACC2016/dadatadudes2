import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Index from 'grommet-index/components/Index';
import Article from 'grommet/components/Article';
import Notification from 'grommet/components/Notification';

import attributes from './attributes';

import PersonRecord from '../../components/PersonRecord';
import EmptyList from '../../components/EmptyList';
import PersonDetailsLayer from '../../components/PersonDetailsLayer';

class PopulationBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      filter: { assessmentId: [] },
      sort: 'lastName:asc',
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response) {
      this.setState({
        result: {
          items: nextProps.response.persons,
          start: 0,
          count: nextProps.response.persons.length,
          total: nextProps.response.persons.length,
          unfilteredTotal: nextProps.response.persons.length,
        },
        personsList: {
          items: nextProps.response.persons,
          start: 0,
          count: nextProps.response.persons.length,
          total: nextProps.response.persons.length,
          unfilteredTotal: nextProps.response.persons.length,
        }
      });
    }
  }

  _handleFiltering() {
    const { filter, sort, query, personsList } = this.state;
    const filtered = personsList.items.filter(person => {
      const matchesSearch = person.lastName.toLowerCase().includes(query.toLowerCase());
      let matchesFilter;
      if (filter.assessmentIds[0] === 'yes') {
        matchesFilter = Array.isArray(person.assessmentIds);
      } else if (filter.assessmentIds[0] === 'no') {
        matchesFilter = !person.assessmentIds;
      } else {
        matchesFilter = true;
      }
      return matchesSearch && matchesFilter;
    });
    const sortType = sort.split(':')[0];
    this.setState({result: {
      items: filtered,
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

  _openLayer(id, assessmentIds) {
    if (!assessmentIds) {
      return this.setState({notification: true});
    }
    this.setState({
      showDetails: true,
      id: id,
    });
  }

  _findPerson(id) {
    const {
      response: { persons },
    } = this.props;
    return persons.find(({_id}) => _id === this.state.id);
  }

  render() {
    // TODO: Remove this
    const riskScore = 6;
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
          view={{medium: 'list', small: 'tiles'}}
          fill={false}
          flush={false}
          onSort={this._onSort}
          onFilter={this._onFilter}
          onQuery={this._onSearch}
          itemComponent={PersonRecord}
          attributes={attributes}
          data={data}
          filter={this.state.filter}
          sort={this.state.sort}
          onMore={() => {}}
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

const personsQuery =
  gql`
  query {
    persons {
      _id
      firstName
      lastName,
      age,
      gender,
      ethnicity,
      districtId,
      assessmentIds
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
  props: ({ data }) => ({
    response: data ? data : []
  })
});

export default listPersons(PopulationBoard);
