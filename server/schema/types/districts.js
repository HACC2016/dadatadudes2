import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType
} from 'graphql';

const DistrictType = new GraphQLObjectType({
  name: 'DistrictType',

  fields: () => ({
    _id: { type: GraphQLID },
    county: { type: GraphQLString },
    districtId: { type: GraphQLString },
    email: { type: GraphQLString },
    member: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

export default DistrictType;
