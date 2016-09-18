import {
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

import UserType from './types/user';
import DistrictType from './types/districts';
import ReportType from './types/reports';
import PersonType from './types/persons';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',

  fields: () => ({
    user: {
      type: UserType,
      description: 'The user identified by a unique id.',
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, { loaders }) => (
        loaders.usersByEmails.load(args.email)
      )
    },

    district: {
      type: DistrictType,
      description: 'The city council district, and associated council member.',
      args: {
        districtId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, { loaders }) => (
        loaders.districtsByIds.load(args.districtId)
      )
    },

    reports: {
      type: new GraphQLList(ReportType),
      description: 'Reported sightings or counts of homeless persons.',
      args: {
        districtId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, { loaders }) => (
        loaders.reportsByDistrictIds.load(args.districtId)
      )
    },

    persons: {
      type: new GraphQLList(PersonType),
      description: 'Description and information of a homeless individual.',
      args: {
        districtId: { type: GraphQLString }
      },
      resolve: (obj, args, { loaders }) => (
        loaders.personsByDistrictIds.load(args.districtId)
      )
    }
  })
});

const Schema = new GraphQLSchema({
  query: QueryType
});

export default Schema;
