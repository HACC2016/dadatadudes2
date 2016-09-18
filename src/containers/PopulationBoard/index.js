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
  }

  render() {
    const mock = {
      items: [
       {name: 'Brock', status: 'critical'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
       {name: 'Alex', status: 'ok'},
      ],
      start: 0,
      count: 2,
      total: 2,
      unfilteredTotal: 2
    }

    return (
      <Article>
        <Index 
          view={{medium: 'list', small: 'tiles'}}
          fill={false}
          flush={false}
          onSort={() => {}}
          onFilter={() => {}}
          onQuery={() => {}}
          itemComponent={PersonRecord}
          attributes={attributes}
          data={mock}
          filter={{}}
          sort={''}
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

