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
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(obj, args, { loaders }) {
        return loaders.usersByIds.load(args.id);
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: QueryType
});

export default Schema;
