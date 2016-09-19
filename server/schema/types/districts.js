import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql';

const DistrictType = new GraphQLObjectType({
  name: 'DistrictType',

  fields: () => ({
    _id: { type: GraphQLID },
    county: { type: GraphQLString },
    personCount: {
      type: GraphQLInt,
      resolve: (obj, args, { mdb }) => (
        mdb.getPersonCountsByDistrictId(obj.districtId)
      )
    },
    averageRisk: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }) => (
        loaders.riskAveragesByDistrictIds.load(obj.districtId)
      )
    },
    districtId: { type: GraphQLString },
    email: { type: GraphQLString },
    member: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

export default DistrictType;
