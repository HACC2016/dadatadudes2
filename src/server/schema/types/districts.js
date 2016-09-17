import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType
} from 'graphql';

const DistrictType = new GraphQLObjectType({
  name: 'DistrictType',

  fields: () => ({
    districtId: { type: GraphQLID },
    email: { type: GraphQLString },
    member: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

export default DistrictType;
