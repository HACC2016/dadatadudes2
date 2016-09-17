import {
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import UserType from './types/user';
import DistrictType from './types/districts';
import ReportType from './types/reports';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',

  fields: () => ({
    user: {
      type: UserType,
      description: 'The user identified by a unique id.',
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(obj, args, { loaders }) {
        return await loaders.usersByEmails.load(args.email);
      }
    },

    district: {
      type: DistrictType,
      description: 'The city council district, and associated council member.',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(obj, args, { loaders }) {
        return await loaders.districtsByIds.load(args.id);
      }
    },

    report: {
      type: ReportType,
      description: 'Reported sightings or counts of homeless persons.',
      args: {
        districtId: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(obj, args, { loaders }) {
        return await loaders.reportsByDistrictIds.load(args.districtId);
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: QueryType
});

export default Schema;
