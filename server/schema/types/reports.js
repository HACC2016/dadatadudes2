import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType
} from 'graphql';

const ReportType = new GraphQLObjectType({
  name: 'ReportType',

  fields: () => ({
    _id: { type: GraphQLID },
    districtId: { type: GraphQLString },
    reportedAt: { type: GraphQLString }
  })
});

export default ReportType;
