import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import ReportType from '../types/reports';

const ReportInputType = new GraphQLInputObjectType({
  name: 'ReportInput',

  fields: () => ({
    districtId: { type: new GraphQLNonNull(GraphQLString) },
    reportedAt: { type: new GraphQLNonNull(GraphQLString) }
  })
});

export default {
  type: new GraphQLList(ReportType),
  args: {
    input: { type: new GraphQLNonNull(ReportInputType) }
  },
  resolve: (obj, { input }, { mdb }) => (
    mdb.addReport(input)
  )
};
