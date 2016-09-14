import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'UserType',

  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLString },
    permissions: { type: new GraphQLList(GraphQLString) }
  }
});

export default UserType;
