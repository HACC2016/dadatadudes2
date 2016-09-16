import {
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import UserType from './types/user';
import DistrictType from './types/districts';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',

  fields: {
    user: {
      type: UserType,
      description: 'The user identified by a unique id.',
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(obj, args, { loaders }) {
        return loaders.usersByEmails.load(args.email);
      }
    },

    district: {
      type: DistrictType,
      description: 'The city council district, and associated council member.',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(obj, args, { loaders }) {
        return loaders.districtsByIds.load(args.id);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: QueryType
});

export default Schema;
