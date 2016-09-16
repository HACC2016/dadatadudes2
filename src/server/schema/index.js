import {
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import UserType from './types/user';

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
    }
  }
});

const Schema = new GraphQLSchema({
  query: QueryType
});

export default Schema;
