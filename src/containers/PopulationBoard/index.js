import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Index from 'grommet-index/components/Index';
import Article from 'grommet/components/Article';

import attributes from './attributes';

import PersonRecord from '../../components/PersonRecord';
import EmptyList from '../../components/EmptyList';

class PopulationBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: { assessmentId: [] },
      sort: 'lastName:asc',
      query: '',
      result: {
        items: [
         {firstName: 'Brock', lastName: 'Lanoza',  assessmentId: [] },
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
        ],
        start: 0,
        count: 2,
        total: 2,
        unfilteredTotal: 2
      },
      data: {
        items: [
         {firstName: 'Brock', lastName: 'Lanoza',  assessmentId: [] },
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
         {firstName: 'Alex',  lastName: 'Anich', assessmentId: ['1']},
        ],
        start: 0,
        count: 2,
        total: 2,
        unfilteredTotal: 2
      }
    };
    this._handleFiltering = this._handleFiltering.bind(this);
    this._onFilter        = this._onFilter.bind(this);
    this._onSort          = this._onSort.bind(this);
    this._onSearch        = this._onSearch.bind(this);
  }

  _handleFiltering() {
    const { filter, sort, query, data } = this.state;
    const filtered = data.items.filter(person => {
      const matchesSearch = person.lastName.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = person.assessmentId.length >= filter.assessmentId.length;
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

  render() {

    return (
      <Article>
        <Index 
          view={{medium: 'list', small: 'tiles'}}
          fill={false}
          flush={false}
          onSort={this._onSort}
          onFilter={this._onFilter}
          onQuery={this._onSearch}
          itemComponent={PersonRecord}
          attributes={attributes}
          data={this.state.result}
          filter={this.state.filter}
          sort={this.state.sort}
          onMore={() => {}}
          label="Population Board"
          emptyMessage={<EmptyList />}
          emptyAddControl={<noscript/>}/>
      </Article>
    );
  }
};

const Query = gql`
  query TestQuery($userEmail: String!, $id: String!) {
    user(email: $userEmail) {
      permissions
      email
    }
    district(id: $id) {
      member
      phone
      email
    }
  }
`;

export default graphql(Query, {
  options: { variables: { userEmail: 'testing.email@email.com', id: '05' } }
})(PopulationBoard);

