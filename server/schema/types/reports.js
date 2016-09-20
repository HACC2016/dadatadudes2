import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType
} from 'graphql';
import PersonType from './persons';

const ReportType = new GraphQLObjectType({
  name: 'ReportType',

  fields: () => ({
    _id: { type: GraphQLID },
    districtId: { type: GraphQLString },
    reportedAt: { type: GraphQLString },
    person: {
      type: PersonType,
      resolve: ({ _id }, args, { loaders }) => (
        loaders.personsByReportIds.load(_id)
      )
    }
  })
});

export default ReportType;
